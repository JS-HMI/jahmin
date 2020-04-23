import { DataCommsEngine } from './DataCommsEngine.js';
import { VarResponse, systemError, ErrorCodes, Actions, VarStatusCodes } from './Types.js';
export class JsonPollEngine extends DataCommsEngine {
    constructor(sysName, config) {
        super(sysName);
        this.name = "JsonPollEngine";
        this.readInterval_ms = config.readInterval_ms || 5000;
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
        this.intervalID = setInterval(this._read_in_intervals.bind(this), this.readInterval_ms);
    }
    async _read_in_intervals() {
        let payload = this.packReadData(Array.from(this.subscribedVar.keys()));
        let response = await this.postData(this.readPrefix, payload, Actions.Read);
        if (!response.success)
            clearInterval(this.intervalID);
        let vars = this.unpackReadData(response, payload);
        this.UpdateVars(vars, VarStatusCodes.Subscribed, Actions.Read);
    }
    async Initialize() {
        return { success: true };
    }
    async Subscribe(variables) {
        return await this.Read(variables);
    }
    async Unsubscribe(variables) {
        return variables.map((v) => { return new VarResponse(true, v, null); });
    }
    async Write(names, values) {
        let payload = this.packWriteData(names, values);
        let response = await this.postData(this.writePrefix, payload, Actions.Write);
        return this.unpackWriteData(response, names);
    }
    async Read(names) {
        let payload = this.packReadData(names);
        let response = await this.postData(this.readPrefix, payload, Actions.Read);
        return this.unpackReadData(response, names);
    }
    packWriteData(Names, Values) {
        if (Names.length !== Values.length)
            throw new Error("Bad data, Names and Values must contain samenumber of elements.");
        return { names: Names, values: Values };
    }
    unpackWriteData(response, request) {
        return this.unpackData(response, request.names, Actions.Write);
    }
    packReadData(Names) {
        return { names: Names };
    }
    unpackReadData(response, request) {
        return this.unpackData(response, request.names, Actions.Read);
    }
    unpackData(response, request, action) {
        let variables = [];
        if (response.success) {
            for (let node of response.data) {
                let var_idx = null;
                if (typeof node.Success === "undefined" || typeof node.Name !== "string" ||
                    node.Name === "" || typeof node.ErrorCode !== "string") {
                    // something is wrong
                    var_idx = new VarResponse(false, node.Name || "Uknown", null);
                    var_idx.setError(ErrorCodes.BadData);
                    this.manager.CreateAndDispatchError(this.system, ErrorCodes.BadData, node.Name || "Uknown", action);
                }
                else {
                    var_idx = new VarResponse(node.Success, node.Name, node.Value);
                    if (!node.Success)
                        var_idx.setError(node.ErrorCode);
                }
                variables.push(var_idx);
            }
        }
        else {
            for (let v of request) {
                let var_idx = new VarResponse(false, v, null);
                var_idx.setError(response.error.code, response.error.message);
                variables.push(var_idx);
            }
        }
        return variables;
    }
    async postData(prefix, data, action) {
        // faking response in case of Net Error
        let response = { ok: false, status: 1000, json: () => { } };
        try {
            response = await fetch(this.host + '/' + prefix, {
                method: 'POST',
                mode: this.mode,
                cache: this.cache,
                credentials: this.credentials,
                headers: this.headers,
                redirect: this.redirect,
                referrerPolicy: this.referrerPolicy,
                body: JSON.stringify(data),
            });
        }
        catch (_a) { }
        let resp_data = null;
        let err = null;
        let status = response.status;
        if (response.ok) {
            try {
                resp_data = await response.json();
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
                case (400):
                    err = { code: ErrorCodes.BadReq, message: "Bad request, data is not understood by the server." };
                    break;
                case (401):
                    err = { code: ErrorCodes.Unauthorized, message: "Unauthoriazed request." };
                    break;
                case (403):
                    err = { code: ErrorCodes.Unauthorized, message: "Unauthoriazed request." };
                    break;
                case (404):
                    err = { code: ErrorCodes.NotFound, message: `Url '${this.host}/${prefix}' not found ` };
                    break;
                case (500):
                    err = { code: ErrorCodes.ServerError, message: "Server Error" };
                    break;
                case (1000):
                    err = { code: ErrorCodes.NetError, message: "Network Error" };
                    break;
                default:
                    err = { code: ErrorCodes.UnknownError, message: "Unknown Error, HTTP status code: " + status.toString() };
            }
            let sys_err = new systemError(this.system, err.code, this.name, Actions.Read);
            err.message = err.message;
            this.manager.DispatchError(sys_err);
            return { success: false, data: null, error: err };
        }
    }
}
