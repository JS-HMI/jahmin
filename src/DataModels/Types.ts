import {css, CSSResult, unsafeCSS} from 'lit-element'

/**
 * Default Status Codes for systemVariables, define the UI appereance and behaviour of the variable.
 * They are simple strings and can be extended with custom statuses.
 */
export enum VarStatusCodes{
    /** The variable is subscribed for receiving updates. This is the default "ALL GOOD". */
    Subscribed = "SUBSCRIBED",
    
    /**Something went wrong in retrieving the variable serverside, like for example the variable does not exist or
     * is corrupted, in general an action by the admin must be taken to fix this. The user should not be able to 
     * interact with the item. The variable is not subscribed. Its value, if any, should not be trusted. 
     */
    Error = "ERROR",

    /**Loading... The variable is waiting to be written or being subscribed. Usefull to show some related UI. */
    Pending = "PENDING", 

    /**The variable value is within some "DANGER" zone. Used to show variable related alarms. */
    Warning = "WARNING",

    /**The variable is ok, but will not receive updates for some reasons, for example no network. 
     * One can trust the variable value as its last updated value.*/
    Unsubscribed = "UNSUBSCRIBED"
}

                
export var VarStatusCodesLit:{[key:string]:CSSResult}= {};
/*Object.keys(VarStatusCodes).forEach((key)=>{
    //@ts-ignore
    VarStatusCodesLit[key] = css`${unsafeCSS(VarStatusCodes[key])}`;
})*/
VarStatusCodesLit.Subscribed = css`${unsafeCSS(VarStatusCodes.Subscribed)}`
VarStatusCodesLit.Error = css`${unsafeCSS(VarStatusCodes.Error)}`
VarStatusCodesLit.Pending = css`${unsafeCSS(VarStatusCodes.Pending)}`
VarStatusCodesLit.Warning = css`${unsafeCSS(VarStatusCodes.Warning)}`
VarStatusCodesLit.Unsubscribed = css`${unsafeCSS(VarStatusCodes.Unsubscribed)}`


export enum ServiceStatusCodes{
    
    /**Engine Running, all ok */
    Ready = "READY",
    /**Engine is still down, no subscription can be made, but no error was raised. */
    Down = "DOWN",
    /**Waiting for initialization to complete */
    Warming = "WARMUP",
    /**Engine could not be initialized. */
    Error = "ERROR"
}

export enum ErrorCodes{
    /**Variable was not found in server */
    VarNotExist = "VAR-NOT-EXIST",
    WontSubcribe = "WONT-SUB",
    CantSubcribe = "CANT-SUB",
    CantUnSubcribe = "CANT-UNSUB",
    /**Provided Write Request value has wrong type or could not be understood */
    BadValue = "BAD-VALUE",
    /**Network is down, cannot retrieve values */
    NoNetwork = "NO-NETWORK",
    NetError = "NET-ERROR",
    /**Action cannot be performed, user has no rights. */
    Unauthorized = "UNAUTHORIZED",
    /**HTTP 400 error on request */
    BadReq = "BAD-REQUEST",
    /**Serverside bug? HTTP 500*/
    ServerError = "SERVER-ERROR",
    /**Return from a HTTP 404 */
    NotFound = "NOT-FOUND",
    BadData = "BAD-DATA",
    EngineNotExist = "NO-ENGINE",
    UnknownError = "UKNOWN"
}

export enum Actions{
    Write = "WRITE",
    Read = "READ",
    Subscribe = "SUBSCRIBE",
    Unsubscribe = "UNSUBSCRIBE",
    Update = "UPDATE",
    Init = "INITIALIZE",
    Unknown = "UNKNOWN"
}

/** It represent a generic object belonging to a specific system */
export interface systemObject{
    name : string
    system : string 
    [key:string] : any
}

export interface basicError{
    code:string
    message?:string
}
/**
 * Describe a system error occurred during a requested Action (like subscribe, write, etc.).
 * @prop {string}  code - Error code as defined in ErrorCodes
 * @prop {string}  message  - The error message (this by default will auto build itself), but you can override it.
 * @prop {string}  systemName  - System name
 * @prop {string}  targetName  - Target of the Action that generated the error, for example the caller of a write method.
 * @prop {string}  action      - Action Code as defined in "Actions", what was going to be performed.
 * @prop {number}  timestamp_ms - Time the error occurred, by default is Date.Now()
 * @prop {boolean} ack          - If the error was acknowledged by user or not.
 */
export class systemError implements basicError{
    
    code:string
    message:string
    timestamp_ms: number
    systemName:string
    action:string
    targetName:string
    ack:boolean

    /**
     * Standard constructor, by default will auto-build the error message and will set timestamp to Now.
     * @param sysName System name for example an engine name
     * @param Code Error code as in "ErrorCodes"
     * @param target (optional) name of who is in fault, like for example a variable name. 
     * @param Action (optional) Action Code of what was going to be performed.
     */
    constructor(sysName:string, Code:string, target:string="",Action:string=""){
        // if(!(err && typeof err.code === "string")) throw TypeError("Err must be valid and of 'basicError' type: {code:string,message?:string}");
        if(typeof Code !== "string") throw TypeError("Code must be a string");
        if(typeof sysName !== "string") throw TypeError("sysName must be a string");
        //this.code = err.code;
        this.code = Code;
        this.timestamp_ms = Date.now() ;
        this.systemName = sysName;
        this.action = Action || "";
        this.targetName = target || "";
        this.ack = false;
        //this.message = err.message ? err.message : this.buildDefaultMessage();
        this.message = this.buildDefaultMessage();
    }

    buildDefaultMessage():string{
        let message = `Error in system (${this.systemName})`;
        if(this.action !== "") message += ` during ${this.action}`;
        if(this.targetName !== "") message += ` on target (${this.targetName})`;
        message +=`. Error Code: ${this.code}.`;
        return message;
    }
}

export class systemAlarm extends systemError {
    isActive : boolean

    constructor(sysName:string, Code:string, target:string, Action:string=""){
        super(sysName, Code,target, Action);
        this.isActive = true;
    }

    buildDefaultMessage():string{
        let message = `Alarm in system (${this.systemName})`;
        if(this.action !== "") message += ` during ${this.action}`;
        if(this.targetName !== "") message += ` on target (${this.targetName})`;
        message +=`. Alarm Code: ${this.code}.`;
        return message;
    }
}

/**
 * Defines a generic variable bound to a specific system.
 * The "value" must be a JSON compatible object, since these values are 
 * persisted in localstorage. So anything is good but functions.
 */
export class systemVariable implements systemObject, variable{
    /**string bla */
    name  : string
    /**string blu */
    system : string
    /**string cu */
    value : any 
    status: string
    // [key:string] : any 

    constructor(sys_obj:systemObject){
        this.system = sys_obj.system;
        this.name   = sys_obj.name;
        this.value = null;
        this.status = null;
    }
}

export interface basicResponse{
    success : boolean
    error?  : basicError
}

export interface variable {
    value : any 
    status: string
    [key:string] : any 
}

/**
 * Class that implemets a general response to actions that involve variable read, write, subscribe, etc.
 * @prop {boolean} success  - weather the request had success or not
 * @prop {object}  error  - if success is false then this must not be null, contain error code and error message(optional).
 * @prop {string} name - name of the variable.
 * @prop {string}  system  -  system name related to the variable.
 * @prop {any}  value  -  the value of the variable (can be an object if supported).
 * @method setError - helper to set the "error" property.
 */
export class VarResponse implements basicResponse, systemObject {
    success:boolean
    error:basicError = null
    name:string
    value:any
    system:string

    constructor(Success:boolean, _name:string, _system:string, _value:any=null){
        this.success = Success;
        this.name = _name;
        this.value = _value;
        this.system = _system;
    }
    setError(ErrorCode:string, Message:string=""){
        this.error = {
            code : ErrorCode,
            message : Message
        }
    }

}
export interface customAction{
    (target:systemObject, data:any) : Promise<basicResponse>
}
