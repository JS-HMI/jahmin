import { StateVariable } from "impera-js";
import { systemObject, systemVariable, VarStatusCodes, variable } from "./Types.js";
/**
 * Class that contains all the data structure of the App for all the subsystems.
 * The app state is saved in here.
 * It is connected automatically to UI element and schedule updates on them.
 */
export declare class DataTree extends StateVariable {
    constructor();
    /**
     * Get the current value and status of the related stateVariable.
     * It returns a proxy to the real stateVariable, this is readonly, as a protection
     * it will throw if you try to assign a value.
     * @param {systemObject} varID - identifier of the variable, an object with keys (name,system)
     */
    GetVar(varID: systemObject): variable;
    Create(varID: systemObject): void;
    UpdateStatus(varID: systemObject, _status: VarStatusCodes): void;
    /**
     * It upadtes with the variable or the list of variables.
     * This will automatically call UI update of all connected elements.
     * @param variables a list or a single systemVariable object with keys (name,system,status,value)
     */
    Update(variables: systemVariable | systemVariable[]): void;
    _create(varID: systemObject): void;
    _multiupdate(sys_vars: systemVariable[]): void;
    _update(varID: systemVariable): void;
    _checkVarType(v: systemVariable): void;
    /**
     * Checks if the variable exist in the current state tree
     * @param varID identifier of the variable, an object with keys (name,system)
     */
    ExistVar(varID: systemObject): boolean;
}
