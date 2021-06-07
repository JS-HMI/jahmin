import {StateVariable} from "impera-js"
import { systemObject, systemVariable, VarStatusCodes, variable } from "./Types.js";
import {escape as escapeHtml} from 'html-escaper';

// NOTE:
// There are plenty of way of doing this, here we chose to have a single 
// object representing the whole App state. If one have many var and many
// subsystems it can be heavy to write in localstorage all the time. It 
// could be more efficient if split instead per subsystem (or even per 
// single variables), to do so Impera-JS needs the additional capability 
// of attaching a stateVar to an already instantiated object, without using 
// a mixin. See issue: https://github.com/WebComponentHelpers/ImperaJS/issues/8

/**
 * Class that contains all the data structure of the App for all the subsystems.
 * The app state is saved in here.
 * It is connected automatically to UI element and schedule updates on them.
 */
export class DataTree extends StateVariable{
    
    constructor(){
        super("datatree",{});

        this.addTransition("create",this._create);
        this.addTransition("update",this._update);
        this.addTransition("multiupdate",this._multiupdate);
    }

    /**
     * Get the current value and status of the related stateVariable.
     * It returns a proxy to the real stateVariable, this is readonly, as a protection 
     * it will throw if you try to assign a value.
     * @param {systemObject} varID - identifier of the variable, an object with keys (name,system)
     */
    GetVar(varID:systemObject) : variable {
        if(this.ExistVar(varID)) {
            return this.value[varID.system][varID.name] ;
        }
        else return null;
    }

    Create(varID:systemObject){
        this.applyTransition("create",varID);
    }

    UpdateStatus(varID:systemObject, _status:VarStatusCodes){
        let upd_var = new systemVariable(varID);
        upd_var.status = _status;
        this.applyTransition("update",upd_var);
    }

    /**
     * It upadtes with the variable or the list of variables.
     * This will automatically call UI update of all connected elements.
     * @param variables a list or a single systemVariable object with keys (name,system,status,value)
     */
    Update(variables:systemVariable|systemVariable[]){
        if(Array.isArray(variables)) {
           this.applyTransition("multiupdate",variables) ;
        }
        else {
            this.applyTransition("update", variables) ;
        }
    }

    _create(varID:systemObject){
        if(varID && typeof varID.system === "string" && typeof varID.name === "string"){
            varID.system = escapeHtml(varID.system);
            varID.name = escapeHtml(varID.name);

            let new_var:variable = {status:null, value:null} ; //new systemVariable(varID.name, varID.system);
            new_var.status = VarStatusCodes.Pending ;
            
            if(!this.value.hasOwnProperty(varID.system))
                this.value[varID.system] = {};
            this.value[varID.system][varID.name] = new_var;
        }
    }

    _multiupdate(sys_vars:systemVariable[]){
        sys_vars.forEach( input_var => {
            this._update(input_var);
        });
    }

    _update(varID:systemVariable){
        this._checkVarType(varID);
        let sys_var = this.GetVar(varID) ;
        if(!sys_var) throw new Error("Requested Variable does not exist: " + varID.name );
        if(typeof varID.value === 'string')  varID.value  = escapeHtml(varID.value);
        if(varID.status) sys_var.status = escapeHtml(varID.status) ;
        // carefull here as value can also be false for a boolean, so if(varID.value) does not work
        if(varID.value !== null && varID.value !== undefined)  sys_var.value  = varID.value ;
    }

    _checkVarType(v:systemVariable){
        if(!v) throw new TypeError("Variable cannot be null");
        if(typeof v.name !== "string") throw new TypeError("Variable Name must be a string");
    }

    /**
     * Checks if the variable exist in the current state tree
     * @param varID identifier of the variable, an object with keys (name,system)
     */
    ExistVar(varID:systemObject){
        if( typeof varID.system !== "string" && typeof varID.name !== "string" ) return false;
        if( !this.value.hasOwnProperty(varID.system) ) return false;
        if( !this.value[varID.system].hasOwnProperty(varID.name) ) return false;
        return true;
    }
}


