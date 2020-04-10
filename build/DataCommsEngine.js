import { dataManager } from './DataManager';
export class DataCommsEngine {
    constructor(systemName) {
        this.manager = dataManager;
        this.name = "DataEngine";
        this.system = systemName;
    }
    /**
     * Action Update. It updates a list of variable values and statuses in the DataManager.
     * The updates will be automatically dispatched to all UI component connected to those variables.
     * @param data A list of variable updates, properties (like status or value) that are null will not be updated.
     */
    UpdateData(data) {
        this.manager.Update(this.system, data);
    }
}
//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error
