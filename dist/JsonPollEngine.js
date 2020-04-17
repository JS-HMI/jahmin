import { DataCommsEngine } from './DataCommsEngine.js';
import { VarResponse, ErrorCodes } from './Types.js';
export class JsonPollEngine extends DataCommsEngine {
    constructor(sysName, config) {
        super(sysName);
        this.name = "JsonPollEngine";
        this.host = config.host || "";
        this.readPrefix = config.readPrefix || "";
        this.writePrefix = config.writePrefix || "";
        this.subscribePrefix = config.subscribePrefix || "";
        this.unsubscribePrefix = config.unsubscribePrefix || "";
        this.mode = config.mode || 'cors'; // no-cors, *cors, same-origin 
        this.cache = config.cache || 'no-cache'; // *default, no-cache, reload, force-cache, only-if-cached
        this.credentials = config.credentials || 'same-origin'; // include, *same-origin, omit
        this.redirect = config.redirect || 'follow'; // manual, *follow, error
        this.referrerPolicy = config.referrerPolicy || 'no-referrer'; // no-referrer
        this.headers = config.headers || {};
        this.headers['Content-Type'] = 'application/json';
    }
    async Initialize() {
        return { success: true };
    }
    async Subscribe(variables) {
        let resp = [];
        variables.forEach(v => {
            resp.push(new VarResponse(true, v));
        });
        return resp;
    }
    async Unsubscribe(variables) {
        return variables.map((v) => { return { success: true }; });
    }
    Write(target, values) {
        throw new Error("Method not implemented.");
    }
    Read(target) {
        throw new Error("Method not implemented.");
    }
    async postData(prefix, data) {
        const response = await fetch(this.host + '/' + prefix, {
            method: 'POST',
            mode: this.mode,
            cache: this.cache,
            credentials: this.credentials,
            headers: this.headers,
            redirect: this.redirect,
            referrerPolicy: this.referrerPolicy,
            body: JSON.stringify(data)
        });
        let resp_data = null;
        let err = null;
        let status = response.status;
        if (response.ok) {
            try {
                resp_data = response.json();
                return {
                    success: true,
                    data: resp_data
                };
            }
            catch (e) {
                err = { code: ErrorCodes.BadValue, message: "Failed to parse JSON response" };
                return {
                    success: false,
                    data: null,
                    error: err
                };
            }
        }
        else {
            switch (status) {
                case (401):
                    err = { code: ErrorCodes.Unauthorized, message: "Unauthoriazed request." };
                    break;
                case (403):
                    err = { code: ErrorCodes.Unauthorized, message: "Unauthoriazed request." };
                    break;
                case (404):
                    err = { code: ErrorCodes.BadValue, message: `Url '${this.host}/${prefix}' not found ` };
                    break;
                case (500):
                    err = { code: ErrorCodes.ServerError, message: "Server Error" };
                    break;
                default:
                    err = { code: ErrorCodes.UnknownError, message: "Unknown Error" };
            }
            return { success: false, data: null, error: err };
        }
    }
}
