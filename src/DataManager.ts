import {StateVariable} from 'impera-js'
import {DataCommsEngine} from './DataCommsEngine'
import {systemVariable} from './Types'


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

    Subscribe(subsystem:string, varName:string):void{

    }

    Unsubscribe(subsystem:string, varName:string):void{
        
    }

    private _updateDataTree(data:systemVariable[]):void{

    }

    Update(system:string, data:systemVariable[]):void{

    }
}



// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var dataManager = new DataManager()

