import { systemVariable, ServiceStatusCodes, VarStatusCodes, systemError, Actions, ErrorCodes } from './Types.js';
import { DataTree } from './DataTree.js';
import { escape as escapeHtml } from 'html-escaper';
import { ErrorTray } from './ErrorTray.js';
export class ServiceManager {
    constructor() {
        this.dataTree = new DataTree();
        this.errorTray = new ErrorTray("errortray");
        this.dataEngines = new Map();
        this.status = ServiceStatusCodes.Down;
        this._initPromise = new Promise((resolve) => {
            this._initResolve = resolve;
        });
    }
    /**
     *
     * @param subsystemName
     * @param engine
     */
    AddEngine(engine) {
        let subsystemName = escapeHtml(engine.system);
        this.dataEngines.set(subsystemName, engine);
    }
    async Subscribe(target) {
        if (!(target.name && target.system))
            throw Error("CANNOT SUBSCRIBE variable " + target.name);
        await this.isInitialized();
        target.name = escapeHtml(target.name);
        target.system = escapeHtml(target.system);
        let engine = this.dataEngines.get(target.system);
        if (engine) {
            if (this.dataTree.ExistVar(target))
                this.dataTree.UpdateStatus(target, VarStatusCodes.Pending);
            else
                this.dataTree.Create(target);
            engine.RequestSubscription(target);
        }
        else {
            this.dataTree.Create(target);
            this.dataTree.UpdateStatus(target, VarStatusCodes.Error);
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Subscribe);
            throw new Error(`Engine '${target.system}' does not exist.`);
        }
    }
    async Unsubscribe(target) {
        if (!(target.name && target.system))
            throw Error("CANNOT UNSUBSCRIBE variable " + target.name);
        await this.isInitialized();
        let engine = this.dataEngines.get(target.system);
        if (engine) {
            engine.RequestUnsubscription(target);
        }
        else {
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Unsubscribe);
            throw new Error(`Engine '${target.system}' does not exist.`);
        }
    }
    Update(system, data) {
        this.dataTree.Update(system, data);
    }
    async Read(system, vars) {
        if (typeof system !== "string" || vars)
            throw new TypeError("'system' must be a string and 'vars' an array of strings");
        await this.isInitialized();
        let engine = this.dataEngines.get(system);
        if (engine) {
            let resp = await engine.Read(vars);
            engine.UpdateVars(resp, null, Actions.Read);
            return resp;
        }
        else {
            this.CreateAndDispatchError(system, ErrorCodes.EngineNotExist, "", Actions.Read);
            throw new Error(`Engine '${system}' does not exist.`);
        }
    }
    async Write(system, vars, values) {
        if (typeof system !== "string" || vars || values)
            throw new TypeError("'system' must be a string and 'vars' and values cannot be null");
        await this.isInitialized();
        let engine = this.dataEngines.get(system);
        if (engine) {
            let sys_vars = vars.map(v => { let x = new systemVariable(v); x.status = VarStatusCodes.Pending; return x; });
            this.dataTree.Update(system, sys_vars);
            let resp = await engine.Write(vars, values);
            engine.UpdateVars(resp, VarStatusCodes.Subscribed, Actions.Write);
            return resp;
        }
        else {
            this.CreateAndDispatchError(system, ErrorCodes.EngineNotExist, "", Actions.Write);
            throw new Error(`Engine '${system}' does not exist.`);
        }
    }
    DispatchError(error) {
        this.errorTray.Create(error);
    }
    CreateAndDispatchError(system, code, target = "", action = "") {
        let error = new systemError(system, code, target, action);
        this.DispatchError(error);
    }
    async Init() {
        // signal that all the engines are added, can start 
        // adding variables to subscription list
        this._initResolve();
        this.status = ServiceStatusCodes.Warming;
        let proms = [];
        Array.from(this.dataEngines.values()).forEach(engine => proms.push(engine._init()));
        await Promise.all(proms);
        this.status = ServiceStatusCodes.Ready;
    }
    isInitialized() {
        return this._initPromise;
    }
}
// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var Manager = new ServiceManager();
