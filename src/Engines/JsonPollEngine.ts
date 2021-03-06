import {DataCommsEngine} from '../DataCommsEngine.js'
import {systemObject,basicResponse,systemVariable, VarResponse, systemError, ErrorCodes, basicError, Actions, VarStatusCodes} from '../DataModels/Types.js'


//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error

export interface JPollConfig {
    readPrefix : string
    writePrefix: string
    readMethod?: string
    host?:string
    subscribePrefix?: string
    unsubscribePrefix?: string
    readInterval_ms?:number
    mode? : RequestMode
    cache? : RequestCache 
    credentials? : RequestCredentials
    headers? : {[key:string]:string}
    redirect? : RequestRedirect
    referrerPolicy? : ReferrerPolicy
}

interface postResponse extends basicResponse{
    data : any
}

export class JsonPollEngine extends DataCommsEngine implements JPollConfig{

    host:string
    readPrefix : string
    writePrefix: string
    readMethod : string
    subscribePrefix: string
    unsubscribePrefix: string
    mode : RequestMode
    cache : RequestCache 
    headers : {[key:string]:string}
    credentials : RequestCredentials
    redirect : RequestRedirect
    referrerPolicy : ReferrerPolicy
    readInterval_ms : number
    shortIntervalID : number
    longIntervalID : number
    failed_request_counter: number
    isLongPoll : boolean


    constructor(sysName:string, config : JPollConfig){
        super(sysName);

        this.readInterval_ms    = config.readInterval_ms || 5000;
        this.host               = config.host || "";
        this.readPrefix         = config.readPrefix || "";
        this.writePrefix        = config.writePrefix || "";
        this.subscribePrefix    = config.subscribePrefix || "";
        this.unsubscribePrefix  = config.unsubscribePrefix || "";
        this.mode               = config.mode || 'cors';                 // no-cors, *cors, same-origin 
        this.cache              = config.cache || 'no-cache';            // *default, no-cache, reload, force-cache, only-if-cached
        this.credentials        = config.credentials || 'same-origin';   // include, *same-origin, omit
        this.redirect           = config.redirect || 'follow';           // manual, *follow, error
        this.referrerPolicy     = config.referrerPolicy || 'no-referrer' // no-referrer
        this.headers            = config.headers || {} ; 
        this.readMethod         = config.readMethod || "POST"
        
        this.headers['Content-Type'] =  'application/json';

        this.shortIntervalID = window.setInterval(this._read_in_intervals.bind(this) , this.readInterval_ms);
        this.longIntervalID = null;
        this.failed_request_counter = 0;
        this.isLongPoll = false;
    }

    async _read_in_intervals()
    {
        let subscriber_list = Array.from(this.subscribedVar.keys()).map(v => this.deserializeSysObject(v));
        if(subscriber_list.length === 0) return;
        let payload = this.packReadData(subscriber_list);
        let response = await this.netRequest( this.readPrefix, payload, Actions.Read );
        if( !response.success ) this.handleFailedRequest();
        else this.handleSuccessRequest();
        let vars = this.unpackReadData(response, subscriber_list);
        this.UpdateVars(vars, VarStatusCodes.Subscribed, Actions.Read) ; 
    }

    handleFailedRequest(){
        if(this.failed_request_counter > 10 && this.isLongPoll === false){
            clearInterval(this.shortIntervalID);
            // setting interval to 2 min
            this.longIntervalID = window.setInterval(this._read_in_intervals.bind(this) , 2*60*1000);
            this.isLongPoll = true;
        }
        this.failed_request_counter++;
    }

    handleSuccessRequest(){
        this.failed_request_counter = 0;
        if(this.isLongPoll === true){
            clearInterval(this.longIntervalID);
            // resetting the short poll intervall
            this.shortIntervalID = window.setInterval(this._read_in_intervals.bind(this) , this.readInterval_ms);
            this.isLongPoll = false;
        }
    }
    
    async Initialize(): Promise<basicResponse> 
    {
        return {success:true} ;
    }    
    async Subscribe(variables: systemObject[]): Promise<VarResponse[]> 
    {
        return await this.Read(variables);
    }
    async Unsubscribe(variables: systemObject[]): Promise<VarResponse[]> 
    {
        return variables.map((v) => { return new VarResponse(true,v.name, v.system,null) });
    }

    async Write(targets:systemObject[], values: any[]): Promise<VarResponse[]> 
    {
        let payload = this.packWriteData(targets,values);
        let response = await this.netRequest(this.writePrefix,payload, Actions.Write);
        return this.unpackWriteData(response, targets);
    }

    async Read(request:systemObject[]): Promise<VarResponse[]> 
    {
        let payload = this.packReadData(request);
        let response = await this.netRequest( this.readPrefix, payload, Actions.Read );
        return this.unpackReadData(response, request);
    }

    packWriteData(request:systemObject[], Values:any[]):object
    {
        if(request.length !== Values.length) throw new Error("Bad data, Names and Values must contain samenumber of elements.")
        // note this engine does not support multiple systems
        let Names = request.map( v => v.name);
        return {names:Names, values:Values};
    }

    unpackWriteData(response: postResponse, request:systemObject[]):VarResponse[]
    {
        return this.unpackData(response,request, Actions.Write);
    }

    packReadData(targets:systemObject[]):object
    {
        // Note this specific engine does not support multiple system (just one)
        let Names = targets.map(t => t.name );
        return {names: Names} ;
    }

    unpackReadData(response: postResponse, request:systemObject[]):VarResponse[]
    {
        return this.unpackData(response,request, Actions.Read);
    }

    unpackData(response: postResponse, request:systemObject[], action:string):VarResponse[]
    {
        let variables:VarResponse[] = [];
        
        if( response.success )
        {
            // this engine does not support multiple systems
            let system = request[0].system;
            
            for(let node of response.data) 
            {
                let var_idx = null;
                if( typeof node.Success === "undefined" || typeof node.Name !== "string" || 
                    node.Name === ""  || typeof node.ErrorCode !== "string") 
                {
                    // something is wrong
                    var_idx = new VarResponse( false, node.Name || "Uknown", system, null );
                    var_idx.setError(ErrorCodes.BadData);
                    this.manager.CreateAndDispatchError(system,ErrorCodes.BadData, node.Name || "Uknown", action );
                }
                else { 
                    var_idx = new VarResponse( node.Success, node.Name, system, node.Value );
                    if( !node.Success ) var_idx.setError(node.ErrorCode);
                }
                variables.push(var_idx);
            }
        }
        else
        {
            for(let v of request)
            {
                let var_idx = new VarResponse( false, v.name, v.system, null);
                var_idx.setError( response.error.code, response.error.message );
                variables.push(var_idx);
            }
        }
        return variables;
    }

    async  netRequest( prefix :string , data:object, action:Actions = Actions.Unknown) : Promise<postResponse> {
        // faking response in case of Net Error
        let response = {ok:false, status:1000, json:()=>{}};
        let _method = ( action === Actions.Read ) ?  this.readMethod : 'POST';
        let options = {
            method         : _method,
            mode           : this.mode,
            cache          : this.cache,
            credentials    : this.credentials,
            headers        : this.headers,
            redirect       : this.redirect,
            referrerPolicy : this.referrerPolicy,
        }

        try
        {
            if( _method === "POST")
            {
                options = Object.assign({body : JSON.stringify(data)}, options);
            }
            response = await fetch(this.host + '/' + prefix, options);
        }
        catch(e)
        {
            console.error(e.message);
        }

        let resp_data:any = null;
        let err: basicError = null;
        let status = response.status;

        if(response.ok) {
            try{
                resp_data = await response.json();
                return { 
                    success : true,
                    data : resp_data
                }
            }
            catch(e){
                err = { code : ErrorCodes.BadValue, message : "Failed to parse JSON response"}
                return {
                    success : false,
                    data :null,
                    error : err
                }
            }
        }
        else 
        {
            switch(status) {
                case(400) :
                    err = { code : ErrorCodes.BadReq, message : "Bad request, data is not understood by the server."}    
                    break;
                case(401) :
                    err = { code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}    
                    break;
                case(403) :
                    err = { code : ErrorCodes.Unauthorized, message : "Unauthoriazed request."}    
                    break;
                case(404) :
                    err = { code: ErrorCodes.NotFound, message: `Url '${this.host}/${prefix}' not found ` }
                    break;
                case(500) :
                    err = { code: ErrorCodes.ServerError, message: "Server Error" }
                    break;
                case(1000):
                    err = { code: ErrorCodes.NetError, message: "Network Error" }
                    break;
                default :
                    err = { code: ErrorCodes.UnknownError, message: "Unknown Error, HTTP status code: " + status.toString()}
            }
            
            let sys_err = new systemError(this.name, err.code, this.name, action);
            err.message = err.message;
            this.manager.DispatchError(sys_err);
            this.OnHTTPError(err);
            return { success:false, data:null, error: err};
        }
    
    }

    OnHTTPError(err:basicError) {}
          
}

