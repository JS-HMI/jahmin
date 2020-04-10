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
export var ErrorCodes;
(function (ErrorCodes) {
    /**Variable was not found in server */
    ErrorCodes["VarNotExist"] = "NOT-EXIST";
    /**Provided Write Request value has wrong type or could not be understood */
    ErrorCodes["BadValue"] = "BAD-VALUE";
    /**Network is down, cannot retrieve values */
    ErrorCodes["NoNetwork"] = "NO-NETWORK";
    /**Action cannot be performed, user has no rights. */
    ErrorCodes["Unauthorized"] = "UNAUTHORIZED";
    /**Serverside bug? */
    ErrorCodes["ServerError"] = "SERVER-ERROR";
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
 * Helper class to quickly build systemVariable to be returned from update function.
 * At least one between "value", "status" must be not null.
 */
export class updateVar {
    constructor(_name) {
        this.value = null;
        this.status = null;
        this.name = _name;
    }
}
