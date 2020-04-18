import {DataCommsEngine} from './DataCommsEngine.js'
import {systemObject,basicResponse,systemVariable, VarResponse, systemError, ErrorCodes, basicError, Actions, VarStatusCodes} from './Types.js'


//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error

export interface JPollConfig {
    readPrefix : string
    writePrefix: string
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

    name = "JsonPollEngine"
    
    host:string
    readPrefix : string
    writePrefix: string
    subscribePrefix: string
    unsubscribePrefix: string
    mode : RequestMode
    cache : RequestCache 
    headers : {[key:string]:string}
    credentials : RequestCredentials
    redirect : RequestRedirect
    referrerPolicy : ReferrerPolicy
    readInterval_ms : number
    intervalID : number

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
        
        this.headers['Content-Type'] =  'application/json';

        this.intervalID = setInterval(this._read_in_intervals.bind(this) , this.readInterval_ms);
    }

    async _read_in_intervals()
    {
        let names:string[] = Array.from(this.subscribedVar.keys());
        let response = await this.postData( this.readPrefix, names, Actions.Read );
        if( !response.success ) clearInterval(this.intervalID);
        let vars = this.unpackReadData(response, names)
        this.UpdateVars(vars, VarStatusCodes.Subscribed, Actions.Read) ; 
    }
    
    async Initialize(): Promise<basicResponse> 
    {
        return {success:true} ;
    }    
    async Subscribe(variables: string[]): Promise<VarResponse[]> 
    {
        return await this.Read(variables);
    }
    async Unsubscribe(variables: string[]): Promise<VarResponse[]> 
    {
        return variables.map((v) => { return new VarResponse(true,v,null) });
    }

    async Write(names:string[], values: any[]): Promise<VarResponse[]> 
    {
        let payload = this.packWriteData(names,values);
        let response = await this.postData(this.writePrefix,payload, Actions.Write);
        return this.unpackWriteData(response, names, values);
    }

    async Read(names:string[]): Promise<VarResponse[]> 
    {
        let payload = this.packReadData(names);
        let response = await this.postData( this.readPrefix, payload, Actions.Read );
        return this.unpackReadData(response, names);
    }

    packWriteData(names:string[], values:any[]):object
    {
        if(names.length !==1 || values.length !==1) throw new Error("Write multiple values not supported yet.");
        return {name:names[0], value:values[0]};
    }

    unpackWriteData(response: postResponse, request_names:string[], request_val:any[]):VarResponse[]
    {
        let _var:VarResponse = null;
        if(request_names.length !==1 || request_val.length !==1) throw new Error("Write multiple values not supported yet.");
        
        if(response.success)
        {
            _var = new VarResponse(response.data.Success, request_names[0], request_val[0]);
            if(!response.data.Success)
            {
                // only two possible errors
                let code = response.data.Error === "NotFound" ? ErrorCodes.VarNotExist : ErrorCodes.BadValue;
                _var.setError( code );
                _var.varValue = null ;
            }
        }
        else
        {
            _var = new VarResponse(false, request_names[0], null)
            _var.error = response.error;
        }
        
        return [_var];
    }

    packReadData(names:string[]):object
    {
        return names ;
    }

    unpackReadData(response: postResponse, request:string[]):VarResponse[]
    {
        let variables:VarResponse[] = [];

        if( response.success )
        {
            for(let node of response.data.Nodes) 
            {
                let var_idx = new VarResponse( node.Success, node.Name, node.Value );
                if( !node.Success ) var_idx.setError(ErrorCodes.VarNotExist);
                variables.push(var_idx);
            }
        }
        else
        {
            for(let v of request)
            {
                let var_idx = new VarResponse( false, v, null);
                var_idx.setError( response.error.code, response.error.message );
            }
        }
        return variables;
    }

    async  postData( prefix :string , data:object, action:string ) : Promise<postResponse> 
    {
        const response = await fetch(this.host + '/' + prefix, {
            method         : 'POST',
            mode           : this.mode,
            cache          : this.cache,
            credentials    : this.credentials,
            headers        : this.headers,
            redirect       : this.redirect,
            referrerPolicy : this.referrerPolicy,
            body           : JSON.stringify(data)
        });
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
                default :
                    err = { code: ErrorCodes.UnknownError, message: "Unknown Error, HTTP status code: " + status.toString()}
            }
            
            let sys_err = new systemError(this.system, err.code, this.name, Actions.Read);
            err.message = err.message;
            this.manager.DispatchError(sys_err);

            return { success:false, data:null, error: err};
        }
    }
      
}

