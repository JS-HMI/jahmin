import { DataCommsEngine } from '../DataCommsEngine.js';
import { basicResponse, VarResponse, systemObject } from '../DataModels/Types.js';
export declare type fakeEngineOptions = {
    poll: boolean;
};
export declare class fakeDataEngine extends DataCommsEngine {
    var_types: Map<string, string>;
    options: fakeEngineOptions;
    constructor(name: string, options?: fakeEngineOptions);
    Initialize(): Promise<basicResponse>;
    _updateVariables(): void;
    Subscribe(variables: systemObject[]): Promise<VarResponse[]>;
    Unsubscribe(variables: systemObject[]): Promise<VarResponse[]>;
    Write(targets: systemObject[], values: any[]): Promise<VarResponse[]>;
    Read(targets: systemObject[]): Promise<VarResponse[]>;
}
