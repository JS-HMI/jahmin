/**
 * Default Status Codes for systemVariables, define the UI appereance and behaviour of the variable.
 * They are simple strings and can be extended with custom statuses.
 */
export var VarStatusCodes;
(function (VarStatusCodes) {
    /** The variable is subscribed for receiving updates. This is the default "ALL GOOD". */
    VarStatusCodes["Subscribed"] = "SUBSCRIBED";
    /**Something went wrong in retrieving the variable serverside, like for example the variable does not exist or
     * is corrupted, in general an action by the admin must be taken to fix this. The user should not be able to
     * interact with the item. The variable is not subscribed. Its value, if any, should not be trusted.
     */
    VarStatusCodes["Error"] = "ERROR";
    /**Loading... The variable is waiting to be written or being subscribed. Usefull to show some related UI. */
    VarStatusCodes["Pending"] = "PENDING";
    /**The variable value is within some "DANGER" zone. Used to show variable related alarms. */
    VarStatusCodes["Warning"] = "WARNING";
    /**The variable is ok, but will not receive updates for some reasons, for example no network.
     * One can trust the variable value as its last updated value.*/
    VarStatusCodes["Unsubscribed"] = "UNSUBSCRIBED";
})(VarStatusCodes || (VarStatusCodes = {}));
export var ServiceStatusCodes;
(function (ServiceStatusCodes) {
    /**Engine Running, all ok */
    ServiceStatusCodes["Ready"] = "READY";
    /**Engine is still down, no subscription can be made, but no error was raised. */
    ServiceStatusCodes["Down"] = "DOWN";
    /**Waiting for initialization to complete */
    ServiceStatusCodes["Warming"] = "WARMUP";
    /**Engine could not be initialized. */
    ServiceStatusCodes["Error"] = "ERROR";
})(ServiceStatusCodes || (ServiceStatusCodes = {}));
export var ErrorCodes;
(function (ErrorCodes) {
    /**Variable was not found in server */
    ErrorCodes["VarNotExist"] = "VAR-NOT-EXIST";
    ErrorCodes["WontSubcribe"] = "WONT-SUB";
    ErrorCodes["CantSubcribe"] = "CANT-SUB";
    ErrorCodes["CantUnSubcribe"] = "CANT-UNSUB";
    /**Provided Write Request value has wrong type or could not be understood */
    ErrorCodes["BadValue"] = "BAD-VALUE";
    /**Network is down, cannot retrieve values */
    ErrorCodes["NoNetwork"] = "NO-NETWORK";
    ErrorCodes["NetError"] = "NET-ERROR";
    /**Action cannot be performed, user has no rights. */
    ErrorCodes["Unauthorized"] = "UNAUTHORIZED";
    /**HTTP 400 error on request */
    ErrorCodes["BadReq"] = "BAD-REQUEST";
    /**Serverside bug? HTTP 500*/
    ErrorCodes["ServerError"] = "SERVER-ERROR";
    /**Return from a HTTP 404 */
    ErrorCodes["NotFound"] = "NOT-FOUND";
    ErrorCodes["BadData"] = "BAD-DATA";
    ErrorCodes["EngineNotExist"] = "NO-ENGINE";
    ErrorCodes["UnknownError"] = "UKNOWN";
})(ErrorCodes || (ErrorCodes = {}));
export var Actions;
(function (Actions) {
    Actions["Write"] = "WRITE";
    Actions["Read"] = "READ";
    Actions["Subscribe"] = "SUBSCRIBE";
    Actions["Unsubscribe"] = "UNSUBSCRIBE";
    Actions["Update"] = "UPDATE";
    Actions["Init"] = "INITIALIZE";
    Actions["Unknown"] = "UNKNOWN";
})(Actions || (Actions = {}));
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
export class systemError {
    /**
     * Standard constructor, by default will auto-build the error message and will set timestamp to Now.
     * @param sysName System name for example an engine name
     * @param Code Error code as in "ErrorCodes"
     * @param target (optional) name of who is in fault, like for example a variable name.
     * @param Action (optional) Action Code of what was going to be performed.
     */
    constructor(sysName, Code, target = "", Action = "") {
        // if(!(err && typeof err.code === "string")) throw TypeError("Err must be valid and of 'basicError' type: {code:string,message?:string}");
        if (typeof Code !== "string")
            throw TypeError("Code must be a string");
        if (typeof sysName !== "string")
            throw TypeError("sysName must be a string");
        //this.code = err.code;
        this.code = Code;
        this.timestamp_ms = Date.now();
        this.systemName = sysName;
        this.action = Action || "";
        this.targetName = target || "";
        this.ack = false;
        //this.message = err.message ? err.message : this.buildDefaultMessage();
        this.message = this.buildDefaultMessage();
    }
    buildDefaultMessage() {
        let message = `Error in system (${this.systemName})`;
        if (this.action !== "")
            message += ` during ${this.action}`;
        if (this.targetName !== "")
            message += ` on target (${this.targetName})`;
        message += `. Error Code: ${this.code}.`;
        return message;
    }
}
export class systemAlarm extends systemError {
    constructor(sysName, Code, target, Action = "") {
        super(sysName, Code, target, Action);
        this.isActive = true;
    }
    buildDefaultMessage() {
        let message = `Alarm in system (${this.systemName})`;
        if (this.action !== "")
            message += ` during ${this.action}`;
        if (this.targetName !== "")
            message += ` on target (${this.targetName})`;
        message += `. Alarm Code: ${this.code}.`;
        return message;
    }
}
/**
 * Defines a generic variable bound to a specific system.
 * The "value" must be a JSON compatible object, since these values are
 * persisted in localstorage. So anything is good but functions.
 */
export class systemVariable {
    // [key:string] : any 
    constructor(sys_obj) {
        this.system = sys_obj.system;
        this.name = sys_obj.name;
        this.value = null;
        this.status = null;
    }
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
export class VarResponse {
    constructor(Success, _name, _system, _value = null) {
        this.error = null;
        this.success = Success;
        this.name = _name;
        this.value = _value;
        this.system = _system;
    }
    setError(ErrorCode, Message = "") {
        this.error = {
            code: ErrorCode,
            message: Message
        };
    }
}
