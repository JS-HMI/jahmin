import { DataCommsEngine } from './DataCommsEngine';
export class JsonPollEngine extends DataCommsEngine {
    constructor() {
        super(...arguments);
        this.name = "JsonPollEngine";
    }
    Init() {
        throw new Error("Method not implemented.");
    }
    Subscribe(variables) {
        throw new Error("Method not implemented.");
    }
    Unsubscribe(variables) {
        throw new Error("Method not implemented.");
    }
    Write(target, names, values) {
        throw new Error("Method not implemented.");
    }
    Read(target, names) {
        throw new Error("Method not implemented.");
    }
}
