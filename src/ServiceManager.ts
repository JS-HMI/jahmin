import {DataCommsEngine} from './DataCommsEngine.js'
import {systemVariable,systemObject, basicResponse, VarStatusCodes} from './Types.js'
import { DataTree } from './DataTree.js'
import {escape as escapeHtml} from 'html-escaper';


export class ServiceManager {

    dataTree = new DataTree();

    dataEngines = new Map<string,DataCommsEngine>()


    /**
     * 
     * @param subsystemName 
     * @param engine 
     */
    AddEngine(subsystemName:string, engine:DataCommsEngine):void{
        subsystemName = escapeHtml(subsystemName);
        this.dataEngines.set(subsystemName,engine)
    }

    Subscribe(target:systemObject):void{
        if( !(target.name && target.system) ) throw Error("CANNOT UNSUBSCRIBE variable " + target.name);
        
        target.name = escapeHtml(target.name);
        target.system = escapeHtml(target.system);

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


    Unsubscribe(target:systemObject):void{
        if( !(target.name && target.system) ) throw Error("CANNOT UNSUBSCRIBE variable " + target.name);
        let engine = this.dataEngines.get(target.system)
        if(engine) { 
            engine.RequestUnsubscription(target);
        }
        else {
            // dispacth error 
        }
    }

    Update(system:string, data:systemVariable[]|systemVariable):void{
        this.dataTree.Update(system,data);
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

