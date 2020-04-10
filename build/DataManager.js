import { StateVariable } from 'impera-js';
class DataManager {
    constructor() {
        this.dataTree = new StateVariable("datatree", {});
        this.dataEngines = new Map();
        // Setup of state transitions
        this.dataTree.addTransition("update", this._updateDataTree);
    }
    /**
     *
     * @param subsystemName
     * @param engine
     */
    AddEngine(subsystemName, engine) {
        this.dataEngines.set(subsystemName, engine);
    }
    Subscribe(subsystem, varName) {
    }
    Unsubscribe(subsystem, varName) {
    }
    _updateDataTree(data) {
    }
    Update(system, data) {
    }
}
// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var dataManager = new DataManager();
