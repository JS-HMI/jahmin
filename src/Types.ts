export type basicValues = string | boolean | number 

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

export enum ErrorCodes{
    /**Variable was not found in server */
    VarNotExist = "NOT-EXIST",
    /**Provided Write Request value has wrong type or could not be understood */
    BadValue = "BAD-VALUE",
    /**Network is down, cannot retrieve values */
    NoNetwork = "NO-NETWORK",
    /**Action cannot be performed, user has no rights. */
    Unauthorized = "UNAUTHORIZED",
    /**Serverside bug? */
    ServerError = "SERVER-ERROR",
    
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
export interface systemError extends basicError{
    
    timestamp:Date
    systemName:string
    action:string
    targetName:string
    ack:boolean
}

/**
 * Defines a generic variable bound to a specific system.
 * The "value" must be a JSON compatible object, since these values are 
 * persisted in localstorage. So anything is good but functions.
 */
export interface systemVariable{
    name:string
    value: any
    status: string
}


/**
 * Helper class to quickly build systemVariable to be returned from update function.
 * At least one between "value", "status" must be not null.
 */
export class updateVar implements systemVariable{
    name  : string
    value : any = null;
    status: string = null;

    constructor(_name:string){
        this.name = _name;
    }
}

export interface basicResponse{
    success : boolean
    error?  : basicError
}

export interface customAction{
    (target:systemObject, data:any) : Promise<basicResponse>
}
