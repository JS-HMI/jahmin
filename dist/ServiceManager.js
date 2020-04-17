import { ServiceStatusCodes, VarStatusCodes } from './Types.js';
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
            // Throw some error here
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
            // dispacth error 
        }
    }
    Update(system, data) {
        this.dataTree.Update(system, data);
    }
    DispatchError(error) {
        this.errorTray.Create(error);
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
