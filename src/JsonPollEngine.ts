import {DataCommsEngine} from './DataCommsEngine.js'
import {systemObject,basicResponse,systemVariable, VarResponse, systemError, ErrorCodes, basicError} from './Types.js'


//--------- WRITE --------------
// 1- HMI-element ---> write(value)
// 2- System Engine --> Request write
// 3- Var status changed --> write request
// 4- on Engine response ---> Write new value to state var or error

export interface JPollConfig {
    host:string,
    readPrefix : string,
    writePrefix: string,
    subscribePrefix: string,
    unsubscribePrefix: string,
    mode? : RequestMode
    cache? : RequestCache 
    credentials? : RequestCredentials
    headers? : {[key:string]:string}
    redirect? : RequestRedirect
    referrerPolicy? : ReferrerPolicy
}

interface postResponse extends basicResponse{
    data : any[]
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

    constructor(sysName:string, config : JPollConfig){
        super(sysName);

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
    }
    
    async Initialize(): Promise<basicResponse> {
        return {success:true} ;
    }    
    async Subscribe(variables: string[]): Promise<VarResponse[]> {
        let resp:VarResponse[] = [];
        variables.forEach(v => {
            resp.push(new VarResponse(true,v));
        });
        
        return resp;
    }
    async Unsubscribe(variables: String[]): Promise<basicResponse[]> {
        return variables.map((v) => { return {success:true} });
    }

    Write(target: systemObject[], values: any[]): Promise<VarResponse[]> {
        throw new Error("Method not implemented.");
    }

    Read(target: systemObject[]): Promise<VarResponse[]> {
        throw new Error("Method not implemented.");
    }
    
    async  postData( prefix :string , data:object ) : Promise<postResponse> {
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
                resp_data = response.json();
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
                    err = { code: ErrorCodes.BadValue, message: `Url '${this.host}/${prefix}' not found ` }
                    break;
                case(500) :
                    err = { code: ErrorCodes.ServerError, message: "Server Error" }
                    break;
                default :
                    err = { code: ErrorCodes.UnknownError, message: "Unknown Error" }
            }
            return { success:false, data:null, error: err};
        }
    }
      
}

