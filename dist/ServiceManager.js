import { systemVariable, VarStatusCodes } from './Types.js';
import { DataTree } from './DataTree.js';
export class ServiceManager {
    constructor() {
        this.dataTree = new DataTree();
        this.dataEngines = new Map();
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
        if (!(target.name && target.system))
            return;
        let engine = this.dataEngines.get(target.system);
        if (engine) {
            if (this.dataTree.ExistVar(target))
                this.dataTree.UpdateStatus(target, VarStatusCodes.Pending);
            else
                this.dataTree.Create(target);
            engine.RequestSubscription(target);
        }
        else {
            this.dataTree.Create(target);
            this.dataTree.UpdateStatus(target, VarStatusCodes.Error);
            // Throw some error here
        }
    }
    CheckSubcriptions(system, targets, resp) {
        if (targets.length !== resp.length) {
            // reaise error
            return;
        }
        let update_var = [];
        for (let idx = 0; idx < targets.length; idx++) {
            let idx_var = new systemVariable(targets[idx]);
            if (!resp[idx].success) {
                // raise error 
                idx_var.status = VarStatusCodes.Error;
            }
            else {
                idx_var.status = VarStatusCodes.Subscribed;
            }
            update_var.push(idx_var);
        }
        this.dataTree.Update(system, update_var);
    }
    Unsubscribe(subsystem, varName) {
    }
    Update(system, data) {
    }
    RaiseError(resp, action, target) {
        // loop over response 
        // raise error in case
        // console.log("Raising Error in case: ");
        // console.log(resp);
    }
}
// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var Manager = new ServiceManager();
