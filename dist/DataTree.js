import { StateVariable } from "impera-js";
import { systemVariable, VarStatusCodes } from "./Types";
// NOTE:
// There are plenty of way of doing this, here we chose to have a single 
// object representing the whole App state. If one have many var and many
// subsystems it can be heavy to write in localstorage all the time. It 
// could be more efficient if split instead per subsystem (or even per 
// single variables), to do so Impera-JS needs the additional capability 
// of attaching a stateVar to an already instantiated object, without using 
// a mixin. See issue: https://github.com/WebComponentHelpers/ImperaJS/issues/8
/**
 * Class that contains all the variable of the App for all the subsystem.
 * It is connected automatically to UI element and schedule updates on them.
 */
export class DataTree extends StateVariable {
    constructor() {
        super("datatree", {});
        this.addTransition("create", this._create);
        this.addTransition("update", this._update);
        this.addTransition("multiupdate", this._multiupdate);
    }
    /**
     * Get the current value and status of the related stateVariable.
     * It returns a proxy to the real stateVariable, this is readonly, as a protection
     * it will throw if you try to assign a value.
     * @param varID identifier of the variable, an object with {name,system}
     */
    GetVar(varID) {
        if (this.ExistVar(varID)) {
            return this.value[varID.system][varID.name];
        }
        else
            return null;
    }
    Create(varID) {
        this.applyTransition("create", varID);
    }
    UpdateStatus(varID, _status) {
        let upd_var = new systemVariable(varID.name);
        upd_var.system = varID.system;
        upd_var.status = _status;
        this.applyTransition("update", upd_var);
    }
    /**
     * It upadtes with the variable or the list of variables.
     * This will automatically call UI update of all connected elements.
     * @param variables a list or a single systemVariable object {name,system,status,value}
     */
    Update(system, variables) {
        if (Array.isArray(variables)) {
            let upd = [];
            variables.forEach(el => {
                el.system = system;
                //@ts-ignore
                upd.push(el);
            });
            this.applyTransition("multiupdate", upd);
        }
        else {
            variables.system = system;
            this.applyTransition("update", variables);
        }
    }
    _create(varID) {
        if (varID && typeof varID.system === "string" && typeof varID.name === "string") {
            let new_var = new systemVariable(varID.name);
            new_var.status = VarStatusCodes.Pending;
            if (!this.value.hasOwnProperty(varID.system))
                this.value[varID.system] = {};
            this.value[varID.system][varID.name] = new_var;
        }
    }
    _multiupdate(sys_vars) {
        sys_vars.forEach(input_var => {
            this._update(input_var);
        });
    }
    _update(varID) {
        let sys_var = this.GetVar(varID);
        if (!varID)
            throw Error("Requested Variable does not exist: " + varID.name);
        this._checkVarType(varID);
        if (varID.status)
            sys_var.status = varID.status;
        if (varID.value)
            sys_var.value = varID.value;
    }
    _checkVarType(v) {
        if (!v)
            throw TypeError("Variable cannot be null");
        if (typeof v.name !== "string")
            throw TypeError("Variable Name must be a string");
    }
    /**
     * Checks if the variable exist in the current state tree
     * @param varID identifier of the variable, an object with {name,system}
     */
    ExistVar(varID) {
        if (!(varID.system && varID.name))
            return false;
        if (!this.value.hasOwnProperty(varID.system))
            return false;
        if (!this.value[varID.system].hasOwnProperty(varID.name))
            return false;
        return true;
    }
}
