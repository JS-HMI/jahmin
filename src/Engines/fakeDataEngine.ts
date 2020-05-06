import {DataCommsEngine} from '../DataCommsEngine.js'
import {basicResponse,VarResponse,systemObject, VarStatusCodes} from '../DataModels/Types.js'
import { Actions } from '../DataModels/Types.js';

export class fakeDataEngine extends DataCommsEngine {
    
    var_types = new Map<string,string>();

    async Initialize(): Promise<basicResponse> {
        // setInterval(this._updateVariables.bind(this), 2000);
        return {success:true };
    }    

    _updateVariables()
    {
        let resp:VarResponse[] = [];
        this.var_types.forEach((val,key)=>{
            if(val === "number") {
                let upd =  Math.floor(Math.random() * 100);
                resp.push(new VarResponse(true, key,"default",upd));
            }
        });
        if(resp.length !== 0 ) this.UpdateVars(resp, VarStatusCodes.Subscribed, Actions.Read );
    }
    
    async Subscribe(variables: systemObject[]): Promise<VarResponse[]> {
        let resp:VarResponse[] = [];
        variables.forEach(v => {
            let el = document.querySelector(`[name="${v.name}"]`);
            if(typeof v.name !== "string" || v.name === "" || el === null){
                resp.push(new VarResponse(false,v.name,v.system));
                return;
            }
            // remember last value
            if(this.manager.dataTree.GetVar(v).value !== null){
                resp.push(new VarResponse(true, v.name, v.system)); 
                return;
            }


            let val:any = 0;
            if(el.tagName.toLowerCase().includes("bool"))
            { 
                val = ( Math.random() > 0.5 ) ? true : false;
                this.var_types.set(v.name,"bool")
            }
            else 
            {
                val = Math.floor(Math.random() * 100);
                this.var_types.set(v.name,"number")
            }
            resp.push(new VarResponse(true, v.name, v.system, val));
        });
        return resp;
    }
    
    async Unsubscribe(variables: systemObject[]): Promise<VarResponse[]> {
        return variables.map(v => new VarResponse(true,v.name, v.system));
    }
    
    async Write(targets: systemObject[], values: any[]): Promise<VarResponse[]> {
        let resp:VarResponse[] = [];
        for(let i=0; i < targets.length; i++)
        {
            resp.push(new VarResponse(true, targets[i].name, targets[i].system, values[i]));
        }
        return resp;
    }
    
    async Read(targets: systemObject[]): Promise<VarResponse[]> {
        throw new Error("Method not implemented.")
    }

}