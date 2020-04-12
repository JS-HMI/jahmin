import {DataCommsEngine} from './DataCommsEngine.js'
import {systemObject,basicValues,basicResponse,systemVariable,customAction} from './Types.js'


//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error

export class JsonPollEngine extends DataCommsEngine {
    
    name = "JsonPollEngine"

    Init(): Promise<basicResponse> {
        throw new Error("Method not implemented.")
    }    
    async Subscribe(variables: String[]): Promise<basicResponse[]> {
        console.log("Subscribing: ");
        console.log(variables);
        let resp:basicResponse[] = [];
        variables.forEach(v => {
            resp.push({success:true});
        });
        
        return resp;
    }
    Unsubscribe(variables: String[]): Promise<basicResponse[]> {
        throw new Error("Method not implemented.")
    }
    Write(target: systemObject, names: string[], values: basicValues[]): Promise<basicResponse> {
        throw new Error("Method not implemented.")
    }
    Read(target: systemObject, names: string[]): Promise<basicResponse> {
        throw new Error("Method not implemented.")
    }
    
}

