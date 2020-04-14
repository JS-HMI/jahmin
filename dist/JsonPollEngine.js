import { DataCommsEngine } from './DataCommsEngine.js';
import { SubscribeResp } from './Types.js';
//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error
export class JsonPollEngine extends DataCommsEngine {
    constructor() {
        super(...arguments);
        this.name = "JsonPollEngine";
    }
    Init() {
        throw new Error("Method not implemented.");
    }
    async Subscribe(variables) {
        let resp = [];
        variables.forEach(v => {
            resp.push(new SubscribeResp(true, v));
        });
        return resp;
    }
    async Unsubscribe(variables) {
        let resp = [];
        variables.forEach(v => {
            resp.push({ success: true });
        });
        return resp;
    }
    Write(target, names, values) {
        throw new Error("Method not implemented.");
    }
    Read(target, names) {
        throw new Error("Method not implemented.");
    }
}
