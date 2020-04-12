 import {StateVariable} from "impera-js"
import {DataCommsEngine} from './DataCommsEngine.js'
import {systemVariable,systemObject, basicResponse} from './Types.js'


class DataManager {

    dataTree = new StateVariable("datatree",{})

    dataEngines = new Map<string,DataCommsEngine>()


    constructor(){
        // Setup of state transitions
        this.dataTree.addTransition("update",this._updateDataTree)
    }

    /**
     * 
     * @param subsystemName 
     * @param engine 
     */
    AddEngine(subsystemName:string, engine:DataCommsEngine):void{
        this.dataEngines.set(subsystemName,engine)
    }

    Subscribe(target:systemObject):void{
        let engine = this.dataEngines.get(target.system)
        if(engine) engine.RequestSubscription(target);
    }

    Unsubscribe(subsystem:string, varName:string):void{
        
    }

    private _updateDataTree(data:systemVariable[]):void{

    }

    Update(system:string, data:systemVariable[]):void{

    }

    RaiseError( resp:basicResponse[], action:string, target:systemObject ){
        // loop over response 
        // raise error in case
        console.log("Raising Error in case: ");
        console.log(resp);
    }
}

// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var dataManager = new DataManager()

