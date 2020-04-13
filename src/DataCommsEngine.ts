import {Manager} from './ServiceManager.js'
import {systemObject,basicValues,basicResponse,systemVariable,customAction, Actions} from './Types.js'



/**Abstract class defining a Comunication Engine for data I/O with a server.*/
export abstract class DataCommsEngine implements systemObject{
    
    manager = Manager;
    system:string
    name = "DataEngine"

    private sub_cache = new Set<string>()
    private unsub_cache = new Set<string>()
    subs_count:{[key:string]:number}= {}
    private sub_timerID:number = null
    private unsub_timerID:number = null
    private bufferTime:number = 10


    constructor( systemName:string ){
        this.system = systemName
    }

    
    SetBufferTime(time_ms:number){
        this.bufferTime = time_ms;
    }

    RequestSubscription(target:systemObject){
        if(this.subs_count.hasOwnProperty(target.name)) this.subs_count[target.name] += 1;
        else this.subs_count[target.name] = 1;

        this.sub_cache.add(target.name)

        if(this.sub_timerID) clearTimeout(this.sub_timerID);

        this.sub_timerID = setTimeout( this._subcribe.bind(this), this.bufferTime );
    }

    RequestUnsubscription(target:systemObject){
        if(!this.subs_count.hasOwnProperty(target.name)) return;

        this.subs_count[target.name] -= 1;
        
        this.unsub_cache.add(target.name);

        if(this.subs_count[target.name] === 0)
        {
            if(this.unsub_timerID) clearTimeout(this.unsub_timerID);
            this.unsub_timerID = setTimeout( this._unsubcribe.bind(this), this.bufferTime );
        } 

    }

    private async _subcribe(){
        let submitted_var = Array.from(this.sub_cache) ;
        let resp = await this.Subscribe( submitted_var );
        
        this.manager.CheckSubcriptions(this.system, submitted_var, resp);
        this.sub_cache.clear();
    }

    private async _unsubcribe(){
        let resp = await this.Unsubscribe( Array.from(this.unsub_cache) );
        this.unsub_cache.clear();
        this.manager.RaiseError(resp, Actions.Unsubscribe, this);
    }

    /**
     * Action Initialize. Place here anything that is needed for initialization of this engine.
     */
    abstract async Init() : Promise<basicResponse> ;

    /**
     * Action Subscribe. It subscribes the list of variables names for automatic updates.
     * @param variables variables names to be subscribed
     */
    abstract async Subscribe(variables:String[]) : Promise<basicResponse[]> ;

    /**
     * Action Unsubscribe. It unubscribes the list of variables names from automatic updates.
     * @param variables variables names to be unsubscribed
     */
    abstract async Unsubscribe(variables:String[]) : Promise<basicResponse[]> ;

    /**
     * Action Write, this can be called by a UI element. 
     * It writes to server the provided list of values to the relative variables.
     * @param target the caller of this action
     * @param names list of variable names to be written to
     * @param values values related to variables to be written
     */
    abstract async Write( target:systemObject, names:string[], values:basicValues[] ) : Promise<basicResponse>
    
    /**
     * Action Read, this can be called by a UI element. 
     * Forces a list of variables to be read from server even if not scheduled.
     * @param target the caller of this action
     * @param names list of variable names to be read
     */
    abstract async Read( target:systemObject, names:string[] ) : Promise<basicResponse>

    /**
     * Action Update. It updates a list of variable values and statuses in the DataManager.
     * The updates will be automatically dispatched to all UI component connected to those variables.
     * @param data A list of variable updates, properties (like status or value) that are null will not be updated.
     */
    UpdateData( data: systemVariable[]) : void {
        this.manager.Update(this.system, data);
    }

    /**
     * Container for Engine dependent Actions. They can be called by UI elements via the function "runAction" providing the key.
     */
    customActions: {
        [key:string] : customAction
    }

}

