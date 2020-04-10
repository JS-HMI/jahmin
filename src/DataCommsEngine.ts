import {dataManager} from './DataManager'
import {systemObject,basicValues,basicResponse,systemVariable,customAction} from './Types'



export abstract class DataCommsEngine implements systemObject{
    
    manager = dataManager;
    system:string
    name = "DataEngine"

    constructor( systemName:string ){
        this.system = systemName
    }

    /**
     * Action Initialize. Place here anything that's neded for initialization of this engine.
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


//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error