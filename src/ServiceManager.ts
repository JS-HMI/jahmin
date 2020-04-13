import {DataCommsEngine} from './DataCommsEngine.js'
import {systemVariable,systemObject, basicResponse, VarStatusCodes} from './Types.js'
import { DataTree } from './DataTree.js'
import { StateVariable } from 'impera-js';


export class ServiceManager {

    dataTree = new DataTree();

    dataEngines = new Map<string,DataCommsEngine>()


    /**
     * 
     * @param subsystemName 
     * @param engine 
     */
    AddEngine(subsystemName:string, engine:DataCommsEngine):void{
        this.dataEngines.set(subsystemName,engine)
    }

    Subscribe(target:systemObject):void{
        if( !(target.name && target.system) ) return ;
        
        let engine = this.dataEngines.get(target.system)
        if(engine) { 
            if(this.dataTree.ExistVar(target)) 
                this.dataTree.UpdateStatus(target, VarStatusCodes.Pending);
            else this.dataTree.Create(target);
            engine.RequestSubscription(target);
        }
        else {
            this.dataTree.Create(target);
            this.dataTree.UpdateStatus(target,VarStatusCodes.Error);
            // Throw some error here
        }
        
    }

    CheckSubcriptions(system:string, targets:string[], resp:basicResponse[]){
        if(targets.length !== resp.length) {
            // reaise error
            return;
        }
        let update_var:systemVariable[] = [] ;

        for( let idx=0;  idx<targets.length; idx++) {
            let idx_var = new systemVariable(targets[idx]) ;
            if(!resp[idx].success) {
                // raise error 
                idx_var.status = VarStatusCodes.Error;
            }
            else {
                idx_var.status = VarStatusCodes.Subscribed;
            }
            update_var.push(idx_var);
        }
        this.dataTree.Update(system,update_var);
    }

    Unsubscribe(subsystem:string, varName:string):void{
        
    }

    Update(system:string, data:systemVariable[]):void{

    }

    RaiseError( resp:basicResponse[], action:string, target:systemObject ){
        // loop over response 
        // raise error in case
        // console.log("Raising Error in case: ");
        // console.log(resp);
    }
}

// A bit ugly, but we must have a data instance that is shared 
// automatically between the ui-elements
export var Manager = new ServiceManager()

