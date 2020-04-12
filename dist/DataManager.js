import { StateVariable } from "impera-js";
import { brick } from 'brick-element';
class DataManager {
    constructor() {
        this.dataTree = new StateVariable("datatree", {});
        this.dataEngines = new Map();
        // Setup of state transitions
        //   this.dataTree.addTransition("update",this._updateDataTree)
        let t = brick ``;
    }
    /**
     *
     * @param subsystemName
     * @param engine
     */
    AddEngine(subsystemName, engine) {
        this.dataEngines.set(subsystemName, engine);
    }
    Subscribe(target) {
        let engine = this.dataEngines.get(target.system);
        if (engine)
            engine.RequestSubscription(target);
    }
    Unsubscribe(subsystem, varName) {
    }
    _updateDataTree(data) {
    }
    Update(system, data) {
    }
    RaiseError(resp, action, target) {
        // loop over response 
        // raise error in case
        console.log("Raising Error in case: ");
        console.log(resp);
    }
}
// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var dataManager = new DataManager();
