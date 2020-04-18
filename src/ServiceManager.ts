import {DataCommsEngine} from './DataCommsEngine.js'
import {systemVariable,systemObject, ServiceStatusCodes, VarStatusCodes, systemError, VarResponse, Actions, ErrorCodes} from './Types.js'
import { DataTree } from './DataTree.js'
import {escape as escapeHtml} from 'html-escaper';
import { ErrorTray } from './ErrorTray.js';


export class ServiceManager 
{
    dataTree  = new DataTree();
    errorTray = new ErrorTray("errortray");

    dataEngines = new Map<string,DataCommsEngine>()

    status = ServiceStatusCodes.Down;
    _initPromise:Promise<void>
    _initResolve:Function

    constructor()
    {
        this._initPromise = new Promise((resolve)=>{
            this._initResolve = resolve;
        })
    }

    /**
     * 
     * @param subsystemName 
     * @param engine 
     */
    AddEngine(engine:DataCommsEngine):void
    {
        let subsystemName = escapeHtml(engine.system);
        this.dataEngines.set(subsystemName,engine)
    }

    async Subscribe(target:systemObject)
    {
        if( !(target.name && target.system) ) throw Error("CANNOT SUBSCRIBE variable " + target.name);
        
        await this.isInitialized();

        target.name = escapeHtml(target.name);
        target.system = escapeHtml(target.system);

        let engine = this.dataEngines.get(target.system)
        if(engine) { 
            if(this.dataTree.ExistVar(target)) 
                this.dataTree.UpdateStatus(target, VarStatusCodes.Pending);
            else this.dataTree.Create(target);
            engine.RequestSubscription(target);
        }
        else {
            this.dataTree.Create(target);
            this.dataTree.UpdateStatus(target,VarStatusCodes.Error);
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Subscribe);
            throw new Error(`Engine '${target.system}' does not exist.`);
        } 
    }


    async Unsubscribe(target:systemObject)
    {
        if( !(target.name && target.system) ) throw Error("CANNOT UNSUBSCRIBE variable " + target.name);
        await this.isInitialized();

        let engine = this.dataEngines.get(target.system)
        if(engine) { 
            engine.RequestUnsubscription(target);
        }
        else {
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Unsubscribe);
            throw new Error(`Engine '${target.system}' does not exist.`);
        }
    }

    Update(system:string, data:systemVariable[]|systemVariable):void
    {
        this.dataTree.Update(system,data);
    }

    async Read(system:string, vars:string[]):Promise<VarResponse[]>
    {
        if( typeof system !== "string" || vars ) throw new TypeError("'system' must be a string and 'vars' an array of strings");
        await this.isInitialized();

        let engine = this.dataEngines.get(system)
        if(engine) 
        { 
            let resp = await engine.Read(vars);
            engine.UpdateVars(resp, null, Actions.Read);
            return resp;
        }
        else 
        {
            this.CreateAndDispatchError(system, ErrorCodes.EngineNotExist, "", Actions.Read);
            throw new Error(`Engine '${system}' does not exist.`);
        }
    }
    async Write(system:string, vars:string[], values:any[]):Promise<VarResponse[]>
    {
        if( typeof system !== "string" || vars || values ) throw new TypeError("'system' must be a string and 'vars' and values cannot be null");
        await this.isInitialized();
        
        let engine = this.dataEngines.get(system)
        if(engine) 
        {
            let sys_vars = vars.map(v => { let x = new systemVariable(v); x.status = VarStatusCodes.Pending; return x;});
            this.dataTree.Update(system, sys_vars);
            let resp = await engine.Write(vars,values);
            engine.UpdateVars(resp, VarStatusCodes.Subscribed, Actions.Write);
            return resp;
        }
        else 
        {
            this.CreateAndDispatchError(system, ErrorCodes.EngineNotExist, "", Actions.Write);
            throw new Error(`Engine '${system}' does not exist.`);
        }
    }

    DispatchError( error:systemError )
    {
        this.errorTray.Create(error);
    }
    CreateAndDispatchError( system:string, code:string, target:string="",action:string="" )
    {
        let error = new systemError(system,code,target,action)
        this.DispatchError(error);
    }

    async Init()
    {
        // signal that all the engines are added, can start 
        // adding variables to subscription list
        this._initResolve(); 

        this.status = ServiceStatusCodes.Warming;
        let proms:Promise<void>[] = [];
        Array.from(this.dataEngines.values()).forEach( engine => proms.push(engine._init()));
        await Promise.all(proms);
        this.status = ServiceStatusCodes.Ready;
    }
    
    isInitialized()
    {
        return this._initPromise;
    }
}

// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var Manager = new ServiceManager()

