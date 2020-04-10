import {DataCommsEngine} from './DataCommsEngine'
import {systemObject,basicValues,basicResponse,systemVariable,customAction} from './Types'


export class JsonPollEngine extends DataCommsEngine {
    
    name = "JsonPollEngine"

    Init(): Promise<basicResponse> {
        throw new Error("Method not implemented.")
    }    
    Subscribe(variables: String[]): Promise<basicResponse[]> {
        throw new Error("Method not implemented.")
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