import {Manager} from './ServiceManager.js'
import {systemObject,ServiceStatusCodes,basicResponse,systemVariable,customAction, Actions, VarResponse, VarStatusCodes, ErrorCodes, systemError} from './Types.js'



/**Abstract class defining a Comunication Engine for data I/O with a server.*/
export abstract class DataCommsEngine {
    
    manager = Manager;
    status:string = ServiceStatusCodes.Down
    name:string
    VarDispatchErrorCases:string[]
    VarErrorUnsubCases:string[]
    VarErrorNoActCases:string[]

    /**
     * Variables waiting to be subscribed for updates. It is a key-number map.
     * The number represent how many UI element times requested updates from that variable.
     * Variables are purged once subscribed. If subscription fails with "NO-NET" 
     * or "CANT-SUB" error the var is kept for later subscription,
     * if fails with "WONT-SUB" or "NOT-EXIST" it will be purged from list.
    */
    toBeSubscribed = new Map<string,number>()
    /**
     * List of Variables waiting to be unsubscribed from updates. 
     */
    toBeUnsubscribed = new Set<string>()
    /**
     * List of Variables currently subscribed for updates. It is a key-number map.
     * The number represent the number of UI-elements registered with the same variable, 
     * usually one, but for special cases could be more.
     */
    subscribedVar = new Map<string,number>()
    sub_timerID:number = null
    unsub_timerID:number = null
    /**
     * Time the system will wait before sending subscruiption/unsubscription, so that variable
     * can be aggregated and make moreefficient network calls.
     */
    aggregationTime_ms:number = 10


    constructor( EngineName:string ){
        this.name = EngineName || "DataEngine";
        
        this.VarDispatchErrorCases = [
            ErrorCodes.VarNotExist, ErrorCodes.WontSubcribe, ErrorCodes.Unauthorized, 
            ErrorCodes.UnknownError, ErrorCodes.CantUnSubcribe];

        this.VarErrorNoActCases = [ErrorCodes.BadValue, ErrorCodes.CantUnSubcribe, 
            ErrorCodes.Unauthorized];
        
        this.VarErrorUnsubCases = [ErrorCodes.CantSubcribe, ErrorCodes.NoNetwork]
    }

    serializeSysObject(target:systemObject):string
    {
        if(typeof target.name !== "string" || target.name.includes(":") ||
           typeof target.system !== "string" || target.system.includes(":"))  return null;

        return ( target.system + ":" + target.name );
    }
    deserializeSysObject(target:string):systemObject
    {
        let tmp = target.split(":");
        if(tmp.length !== 2 ) return null;
        return { system : tmp[0], name:tmp[1]};
    }

    RequestSubscription(target:systemObject){
        let ser_obj = this.serializeSysObject(target);
        if(ser_obj === null) throw Error("CANNOT SUBSCRIBE variable " + target.name);
        
        let count  = this.toBeSubscribed.get(ser_obj) || 0;
        this.toBeSubscribed.set(ser_obj, count + 1);
        
        // this case just fill the subscribelist,willbe submitted after init
        if(this.status === ServiceStatusCodes.Down ||
            this.status === ServiceStatusCodes.Warming ) return;
        
        if(this.sub_timerID) clearTimeout(this.sub_timerID);

        this.sub_timerID = setTimeout( this._subcribe.bind(this), this.aggregationTime_ms );
    }

    RequestUnsubscription(target:systemObject){
        let ser_obj = this.serializeSysObject(target);
        if(ser_obj === null || !this.subscribedVar.has(ser_obj)) throw Error("CANNOT UNSUBSCRIBE variable " + target.name);

        let count = this.subscribedVar.get(ser_obj);
        if(count > 1 ) {
            // the variable needs to remain subscribed untill there 
            // are related UI element connected
            this.subscribedVar.set(ser_obj, count - 1) ; 
            return ;
        }
        this.toBeUnsubscribed.add(ser_obj);

        if(this.unsub_timerID) clearTimeout(this.unsub_timerID);
        this.unsub_timerID = setTimeout( this._unsubcribe.bind(this), this.aggregationTime_ms );
    }

    async _subcribe(){
        let targets = Array.from(this.toBeSubscribed.keys()).map( t => this.deserializeSysObject(t));
        let response = await this.Subscribe( targets );
        this.updateSubscriberLists(response);
        this.UpdateVars(response, VarStatusCodes.Subscribed, Actions.Subscribe);
    }

    updateSubscriberLists(response:VarResponse[]){
        for (let rsp of response) 
        {
            let var_id = this.serializeSysObject(rsp);
            if(rsp.success) 
            {
                let count = this.toBeSubscribed.get(var_id);
                count +=  ( this.subscribedVar.get(var_id) || 0 );
                this.subscribedVar.set(var_id, count );
                this.toBeSubscribed.delete(var_id);
            }
            else 
            {
                let code = rsp.error ? rsp.error.code : ErrorCodes.UnknownError;
                // keep in list for next try later in case of these errors
                if(code !== ErrorCodes.NoNetwork && code !== ErrorCodes.CantSubcribe)
                    this.toBeSubscribed.delete(var_id);
            }
        }
    }

    UpdateVars(response:VarResponse[], ok_status:VarStatusCodes, action:string = "")
    {
        let var_upd:systemVariable[] = [];

        for( let rsp of response ){
            let var_idx = new systemVariable(rsp);
            if(rsp.success) 
            {
                var_idx.status = ok_status ;
                if(rsp.value) var_idx.value  = rsp.value;
            }
            else 
            {
                let code = rsp.error ? rsp.error.code : ErrorCodes.UnknownError;
                
                if( this.VarDispatchErrorCases.includes(code))
                    this.manager.CreateAndDispatchError(rsp.system,code, rsp.name,action);

                if(this.VarErrorUnsubCases.includes(code)) 
                    var_idx.status = VarStatusCodes.Unsubscribed;
                
                else if(this.VarErrorNoActCases.includes(code)) // no modify status, unless is "pending"
                {   
                    let _var = this.manager.dataTree.GetVar(rsp);
                    var_idx.status = _var.status === VarStatusCodes.Pending ? VarStatusCodes.Subscribed : null ;
                }
                else var_idx.status = VarStatusCodes.Error;
            }
            var_upd.push(var_idx);
        }
        this.manager.Update(var_upd);
    }

    async _unsubcribe()
    {
        let targets = Array.from(this.toBeUnsubscribed).map( t => this.deserializeSysObject(t));
        let response = await this.Unsubscribe( targets );
        for (let rsp of response)
        {
            let var_id = this.serializeSysObject(rsp);
            if(rsp.success) this.subscribedVar.delete(var_id);
            this.toBeUnsubscribed.delete(var_id);            
        }
        this.UpdateVars(response, VarStatusCodes.Unsubscribed, Actions.Unsubscribe);
    }


    async _init()
    {
        this.status = ServiceStatusCodes.Warming;
        let resp = await this.Initialize() ;
        
        if(resp.success) this.status = ServiceStatusCodes.Ready ;
        else 
        {
            this.status = ServiceStatusCodes.Error ;
            let code = resp.error ? resp.error.code : ErrorCodes.UnknownError;
            let err = new systemError(this.name, code, this.name, Actions.Init);
            this.manager.DispatchError(err);
        }
        if(this.toBeSubscribed.size > 0) this._subcribe();
    }

    /**
     * Action Initialize. Place here anything that is needed for initialization of this engine.
     */
    abstract async Initialize() : Promise<basicResponse> ;

    /**
     * Action Subscribe. It subscribes the list of variables names for automatic updates.
     * @param variables variables names to be subscribed
     */
    abstract async Subscribe(variables:systemObject[]) : Promise<VarResponse[]> ;

    /**
     * Action Unsubscribe. It unubscribes the list of variables names from automatic updates.
     * @param variables variables names to be unsubscribed
     */
    abstract async Unsubscribe(variables:systemObject[]) : Promise<VarResponse[]> ;

    /**
     * Action Write, this can be called by a UI element. 
     * It writes to server the provided list of values to the relative variables.
     * @param names list of variables to be written to
     * @param values values related to variables to be written
     */
    abstract async Write( targets:systemObject[], values:any[] ) : Promise<VarResponse[]>
    
    /**
     * Action Read, this can be called by a UI element. 
     * Forces a list of variables to be read from server even if not scheduled.
     * @param names list of variable to be read
     */
    abstract async Read( targets:systemObject[] ) : Promise<VarResponse[]>

    /**
     * Action Update. It updates a list of variable values and statuses in the DataManager.
     * The updates will be automatically dispatched to all UI component connected to those variables.
     * @param data A list of variable updates, properties (like status or value) that are null will not be updated.
     */
    UpdateData( data: systemVariable[]) : void {
        this.manager.Update(data);
    }

    /**
     * Container for Engine dependent Actions. They can be called by UI elements via the function "runAction" providing the key.
     */
    customActions: {
        [key:string] : customAction
    }

}

