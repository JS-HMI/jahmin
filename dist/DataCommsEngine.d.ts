import { ServiceManager } from './ServiceManager.js';
import { systemObject, basicResponse, systemVariable, customAction, VarResponse, VarStatusCodes } from './DataModels/Types.js';
/**Abstract class defining a Comunication Engine for data I/O with a server.
 *
 * @prop toBeSubscribed {Map<string,number>} -  Variables waiting to be subscribed for updates. It is a key-number map.
 * The number represent how many UI element times requested updates from that variable.
 * Variables are purged once subscribed. If subscription fails with "NO-NET"
 * or "CANT-SUB" error the var is kept for later subscription, if fails with "WONT-SUB" or "NOT-EXIST" it will be purged from list.
 *
 * @prop toBeUnsubscribed {Set<string>} - List of Variables waiting to be unsubscribed from updates.
 *
 * @prop subscribedVar  {Map<string,number>} - List of Variables currently subscribed for updates. It is a key-number map.
 * The number represent the number of UI-elements registered with the same variable,
 * usually one, but for special cases could be more.
 *
 * @prop aggregationTime_ms {number} - Time the system will wait before sending subscruiption/unsubscription, so that variable
 * can be aggregated and make moreefficient network calls.
*/
export declare abstract class DataCommsEngine {
    manager: ServiceManager;
    status: string;
    name: string;
    VarDispatchErrorCases: string[];
    VarErrorUnsubCases: string[];
    VarErrorNoActCases: string[];
    toBeSubscribed: Map<string, number>;
    toBeUnsubscribed: Set<string>;
    subscribedVar: Map<string, number>;
    sub_timerID: number;
    unsub_timerID: number;
    aggregationTime_ms: number;
    constructor(EngineName: string);
    serializeSysObject(target: systemObject): string;
    deserializeSysObject(target: string): systemObject;
    RequestSubscription(target: systemObject): void;
    RequestUnsubscription(target: systemObject): void;
    _subcribe(): Promise<void>;
    updateSubscriberLists(response: VarResponse[]): void;
    isVarSubscribed(varID: systemObject): boolean;
    UpdateVars(response: VarResponse[], ok_status: VarStatusCodes, action?: string): void;
    _unsubcribe(): Promise<void>;
    _init(): Promise<void>;
    /**
     * Abstract method. Action Initialize. Place here anything that is needed for initialization of this engine.
     * @abstract
     * @return {basicResponse} - return status of initialization action.
     */
    Initialize(): Promise<basicResponse>;
    /**
     * Abstract method. Action Subscribe. It subscribes the list of variables names for automatic updates.
     * @abstract
     * @param {systemObject[]} variables - variables names to be subscribed
     * @return {Promise<VarResponse[]>}  - Response of the action.
     */
    Subscribe(variables: systemObject[]): Promise<VarResponse[]>;
    /**
     * Abstract method. Action Unsubscribe. It unubscribes the list of variables names from automatic updates.
     * @abstract
     * @param {systemObject[]} variables - variables names to be unsubscribed
     * @return {Promise<VarResponse[]>} - Response of the action.
     */
    Unsubscribe(variables: systemObject[]): Promise<VarResponse[]>;
    /**
     * Abstract method. Action Write, this can be called by a UI element.
     * It writes to server the provided list of values to the relative variables.
     * @abstract
     * @param {systemObject[]} targets - variables names to be unsubscribed
     * @param values {any[]} - values related to variables to be written
     * @return {Promise<VarResponse[]>}
     */
    Write(targets: systemObject[], values: any[]): Promise<VarResponse[]>;
    /**
     * Abstract method. Action Read, this can be called by a UI element.
     * Forces a list of variables to be read from server even if not scheduled.
     * @abstract
     * @param names list of variable to be read
     * @return  {Promise<VarResponse[]>}
     */
    Read(targets: systemObject[]): Promise<VarResponse[]>;
    /**
     * Action Update. It updates a list of variable values and statuses in the DataManager.
     * The updates will be automatically dispatched to all UI component connected to those variables.
     * @param data A list of variable updates, properties (like status or value) that are null will not be updated.
     */
    UpdateData(data: systemVariable[]): void;
    /**
     * Container for Engine dependent Actions. They can be called by UI elements via the function "runAction" providing the key.
     */
    customActions: {
        [key: string]: customAction;
    };
}
