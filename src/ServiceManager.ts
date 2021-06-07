import {DataCommsEngine} from './DataCommsEngine.js'
import {systemVariable,systemObject, ServiceStatusCodes, VarStatusCodes, systemError, VarResponse, Actions, ErrorCodes} from './DataModels/Types.js'
import { DataTree } from './DataModels/DataTree.js'
import {escape as escapeHtml} from 'html-escaper';
import { ErrorTray } from './DataModels/ErrorTray.js';

/**Organizzational class */
export class ServiceManager 
{
    dataTree  = new DataTree();
    errorTray = new ErrorTray("errortray");

    dataEngines = new Map<string,DataCommsEngine>()
    _defaultEngine : DataCommsEngine
    status = ServiceStatusCodes.Down;
    _initPromise:Promise<boolean>
    _initResolve:Function

    constructor()
    {
        this._initPromise = new Promise((resolve)=>{
            this._initResolve = resolve;
        })
        this._defaultEngine = null;
    }

    /**
     * 
     * @param subsystemName 
     * @param engine 
     */
    AddEngine(engine:DataCommsEngine):void
    {
        let subsystemName = escapeHtml(engine.name);
        this.dataEngines.set(subsystemName,engine);
        engine.manager = this;
        if(this._defaultEngine === null) this._defaultEngine = engine;
    }

    SetDefaultEngine(engine:DataCommsEngine):void
    {
        if(!this.dataEngines.has(engine.name)) this.AddEngine(engine);
        this._defaultEngine = engine;
    }

    GetEngine(engine_name:string):DataCommsEngine{
        if(typeof engine_name !== "string") throw Error("Engine Name must be a string");
        if(engine_name.toLocaleLowerCase() === "default") return this._defaultEngine;
        else return this.dataEngines.get(engine_name);
    }

    async Subscribe(engine_name:string, target:systemObject)
    {
        if( typeof target.name !== "string" || typeof target.system !== "string" )  
            throw Error("CANNOT SUBSCRIBE variable " + target.name);
        
        await this.isInitialized();
        target.name = escapeHtml(target.name);
        target.system = escapeHtml(target.system);

        let engine = this.GetEngine(engine_name)
        if(engine) { 
            if(this.dataTree.ExistVar(target)){
                if(!engine.isVarSubscribed(target) && this.dataTree.GetVar(target).status !== VarStatusCodes.Pending)  // var exist from localstorage but not yet subscribed
                    this.dataTree.UpdateStatus(target, VarStatusCodes.Pending);
                
            } 
            else  this.dataTree.Create(target);
            engine.RequestSubscription(target);
        }
        else {
            this.dataTree.Create(target);
            this.dataTree.UpdateStatus(target,VarStatusCodes.Error);
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Subscribe);
            throw new Error(`Engine '${engine_name}' does not exist.`);
        } 
    }


    async Unsubscribe(engine_name:string, target:systemObject)
    {
        if( typeof target.name !== "string" || typeof target.system !== "string"  )  
            throw Error("CANNOT UNSUBSCRIBE variable " + target.name);

        await this.isInitialized();

        let engine = this.GetEngine(engine_name)
        if(engine) { 
            engine.RequestUnsubscription(target);
        }
        else {
            this.CreateAndDispatchError(target.system, ErrorCodes.EngineNotExist, "", Actions.Unsubscribe);
            throw new Error(`Engine '${engine_name}' does not exist.`);
        }
    }

    Update(data:systemVariable[]|systemVariable):void
    {
        this.dataTree.Update(data);
    }

    async Read(engine_name:string, vars:systemObject[]):Promise<VarResponse[]>
    {
        if( typeof vars !== "object") throw new TypeError("'system' must be a string and 'vars' an array of strings");
        await this.isInitialized();

        let engine = this.GetEngine(engine_name)
        if(engine) 
        { 
            let resp = await engine.Read(vars);
            // Maybe here we need something like STATUS OK - if was in error it is not clear that it would be subscribed
            // see issue https://github.com/JaS-HMI/jashmi/issues/2
            engine.UpdateVars(resp, VarStatusCodes.Subscribed, Actions.Read);
            return resp;
        }
        else 
        {
            this.CreateAndDispatchError(engine_name, ErrorCodes.EngineNotExist, "", Actions.Read);
            throw new Error(`Engine '${engine_name}' does not exist.`);
        }
    }

    async Write(engine_name:string, vars:systemObject[], values:any[]):Promise<VarResponse[]>
    {
        if(  typeof vars !== "object"   || 
            typeof values !== "object"   ) throw new TypeError("'system' must be a string and 'vars' and values cannot be null");
        
        await this.isInitialized();
        
        let engine = this.GetEngine(engine_name)
        if(engine) 
        {
            let sys_vars = vars.map(v => { let x = new systemVariable(v); x.status = VarStatusCodes.Pending; return x;});
            this.dataTree.Update(sys_vars);
            let resp = await engine.Write(vars,values);
            // Maybe here we need something like STATUS OK - if was in error it is not clear that it would be subscribed
            // see issue https://github.com/JaS-HMI/jashmi/issues/2
            engine.UpdateVars(resp, VarStatusCodes.Subscribed, Actions.Write);
            return resp;
        }
        else 
        {
            this.CreateAndDispatchError(engine_name, ErrorCodes.EngineNotExist, "", Actions.Write);
            throw new Error(`Engine '${engine_name}' does not exist.`);
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
        
        this.status = ServiceStatusCodes.Warming;
        let proms:Promise<void>[] = [];
        Array.from(this.dataEngines.values()).forEach( engine => proms.push(engine._init()));
        await Promise.all(proms);
        this.status = ServiceStatusCodes.Ready;
        
        // signal that all the engines are added, can start 
        // adding variables to subscription list
        this._initResolve(true); 
    }
    
    isInitialized()
    {
        return this._initPromise;
    }
}

// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var Manager = new ServiceManager()

