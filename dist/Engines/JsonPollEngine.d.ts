import { DataCommsEngine } from '../DataCommsEngine.js';
import { systemObject, basicResponse, VarResponse, Actions } from '../DataModels/Types.js';
export interface JPollConfig {
    readPrefix: string;
    writePrefix: string;
    readMethod?: string;
    host?: string;
    subscribePrefix?: string;
    unsubscribePrefix?: string;
    readInterval_ms?: number;
    mode?: RequestMode;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: {
        [key: string]: string;
    };
    redirect?: RequestRedirect;
    referrerPolicy?: ReferrerPolicy;
}
interface postResponse extends basicResponse {
    data: any;
}
export declare class JsonPollEngine extends DataCommsEngine implements JPollConfig {
    host: string;
    readPrefix: string;
    writePrefix: string;
    readMethod: string;
    subscribePrefix: string;
    unsubscribePrefix: string;
    mode: RequestMode;
    cache: RequestCache;
    headers: {
        [key: string]: string;
    };
    credentials: RequestCredentials;
    redirect: RequestRedirect;
    referrerPolicy: ReferrerPolicy;
    readInterval_ms: number;
    shortIntervalID: number;
    longIntervalID: number;
    failed_request_counter: number;
    isLongPoll: boolean;
    constructor(sysName: string, config: JPollConfig);
    _read_in_intervals(): Promise<void>;
    handleFailedRequest(): void;
    handleSuccessRequest(): void;
    Initialize(): Promise<basicResponse>;
    Subscribe(variables: systemObject[]): Promise<VarResponse[]>;
    Unsubscribe(variables: systemObject[]): Promise<VarResponse[]>;
    Write(targets: systemObject[], values: any[]): Promise<VarResponse[]>;
    Read(request: systemObject[]): Promise<VarResponse[]>;
    packWriteData(request: systemObject[], Values: any[]): object;
    unpackWriteData(response: postResponse, request: systemObject[]): VarResponse[];
    packReadData(targets: systemObject[]): object;
    unpackReadData(response: postResponse, request: systemObject[]): VarResponse[];
    unpackData(response: postResponse, request: systemObject[], action: string): VarResponse[];
    netRequest(prefix: string, data: object, action?: Actions): Promise<postResponse>;
}
export {};
