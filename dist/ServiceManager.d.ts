import { DataCommsEngine } from './DataCommsEngine.js';
import { systemVariable, systemObject, ServiceStatusCodes, systemError, VarResponse } from './DataModels/Types.js';
import { DataTree } from './DataModels/DataTree.js';
import { ErrorTray } from './DataModels/ErrorTray.js';
/**Organizzational class */
export declare class ServiceManager {
    dataTree: DataTree;
    errorTray: ErrorTray;
    dataEngines: Map<string, DataCommsEngine>;
    _defaultEngine: DataCommsEngine;
    status: ServiceStatusCodes;
    _initPromise: Promise<boolean>;
    _initResolve: Function;
    constructor();
    /**
     *
     * @param subsystemName
     * @param engine
     */
    AddEngine(engine: DataCommsEngine): void;
    SetDefaultEngine(engine: DataCommsEngine): void;
    GetEngine(engine_name: string): DataCommsEngine;
    Subscribe(engine_name: string, target: systemObject): Promise<void>;
    Unsubscribe(engine_name: string, target: systemObject): Promise<void>;
    Update(data: systemVariable[] | systemVariable): void;
    Read(engine_name: string, vars: systemObject[]): Promise<VarResponse[]>;
    Write(engine_name: string, vars: systemObject[], values: any[]): Promise<VarResponse[]>;
    DispatchError(error: systemError): void;
    CreateAndDispatchError(system: string, code: string, target?: string, action?: string): void;
    Init(): Promise<void>;
    isInitialized(): Promise<boolean>;
}
export declare var Manager: ServiceManager;
