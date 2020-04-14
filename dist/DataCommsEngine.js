import { Manager } from './ServiceManager.js';
import { systemVariable, VarStatusCodes, ErrorCodes } from './Types.js';
/**Abstract class defining a Comunication Engine for data I/O with a server.*/
export class DataCommsEngine {
    constructor(systemName) {
        this.manager = Manager;
        this.name = "DataEngine";
        /**
         * Variables waiting to be subscribed for updates. It is a key-number map.
         * The number represent how many UI element times requested updates from that variable.
         * Variables are purged once subscribed. If subscription fails with "NO-NET"
         * or "CANT-SUB" error the var is kept for later subscription,
         * if fails with "WONT-SUB" or "NOT-EXIST" it will be purged from list.
        */
        this.toBeSubscribed = new Map();
        /**
         * List of Variables waiting to be unsubscribed from updates.
         */
        this.toBeUnsubscribed = new Set();
        /**
         * List of Variables currently subscribed for updates. It is a key-number map.
         * The number represent the number of UI-elements registered with the same variable,
         * usually one, but for special cases could be more.
         */
        this.subscribedVar = new Map();
        this.sub_timerID = null;
        this.unsub_timerID = null;
        /**
         * Time the system will wait before sending subscruiption/unsubscription, so that variable
         * can be aggregated and make moreefficient network calls.
         */
        this.aggregationTime_ms = 10;
        this.system = systemName;
    }
    RequestSubscription(target) {
        let count = this.toBeSubscribed.get(target.name) || 0;
        this.toBeSubscribed.set(target.name, count + 1);
        if (this.sub_timerID)
            clearTimeout(this.sub_timerID);
        this.sub_timerID = setTimeout(this._subcribe.bind(this), this.aggregationTime_ms);
    }
    RequestUnsubscription(target) {
        if (!this.subscribedVar.has(target.name))
            throw Error("CANNOT UNSUBSCRIBE variable " + target.name);
        let count = this.subscribedVar.get(target.name);
        if (count > 1) {
            // the variable needs to remain subscribed untill there 
            // are related UI element connected
            this.subscribedVar.set(target.name, count - 1);
            return;
        }
        this.toBeUnsubscribed.add(target.name);
        if (this.unsub_timerID)
            clearTimeout(this.unsub_timerID);
        this.unsub_timerID = setTimeout(this._unsubcribe.bind(this), this.aggregationTime_ms);
    }
    async _subcribe() {
        let submitted_var = Array.from(this.toBeSubscribed.keys());
        let resp = await this.Subscribe(submitted_var);
        let var_upd = [];
        for (let sub_rsp of resp) {
            let varName = sub_rsp.varName;
            let var_idx = new systemVariable(sub_rsp.varName);
            if (sub_rsp.success) {
                let count = this.toBeSubscribed.get(varName);
                count += (this.subscribedVar.get(varName) || 0);
                this.subscribedVar.set(sub_rsp.varName, count);
                this.toBeSubscribed.delete(sub_rsp.varName);
                var_idx.status = VarStatusCodes.Subscribed;
                if (sub_rsp.varValue)
                    var_idx.value = sub_rsp.varValue;
            }
            else {
                if (sub_rsp.error && sub_rsp.error.code) {
                    let code = sub_rsp.error.code;
                    if (code === ErrorCodes.VarNotExist || code === ErrorCodes.WontSubcribe) {
                        this.toBeSubscribed.delete(sub_rsp.varName);
                        var_idx.status = VarStatusCodes.Error;
                        // Dispatch error                        
                    }
                    // keep subscribe later
                    else
                        var_idx.status = VarStatusCodes.Unsubscribed;
                }
                else {
                    this.toBeSubscribed.delete(sub_rsp.varName);
                    var_idx.status = VarStatusCodes.Error;
                    // Dispatch error
                }
            }
            var_upd.push(var_idx);
        }
        this.manager.Update(this.system, var_upd);
    }
    async _unsubcribe() {
        let unsubscrib_list = Array.from(this.toBeUnsubscribed);
        let resp = await this.Unsubscribe(unsubscrib_list);
        let var_upd = [];
        for (let idx = 0; idx < resp.length; idx++) {
            let var_name = unsubscrib_list[idx];
            let var_idx = new systemVariable(var_name);
            if (resp[idx].success) {
                this.subscribedVar.delete(var_name);
                this.toBeUnsubscribed.delete(var_name);
                var_idx.status = VarStatusCodes.Unsubscribed;
            }
            else {
                if (resp[idx].error && resp[idx].error.code && resp[idx].error.code !== ErrorCodes.CantUnSubcribe) {
                    var_idx.status = VarStatusCodes.Error;
                    // Dispacth Error
                }
            }
            var_upd.push(var_idx);
        }
        this.manager.Update(this.system, var_upd);
    }
    /**
     * Action Update. It updates a list of variable values and statuses in the DataManager.
     * The updates will be automatically dispatched to all UI component connected to those variables.
     * @param data A list of variable updates, properties (like status or value) that are null will not be updated.
     */
    UpdateData(data) {
        this.manager.Update(this.system, data);
    }
}
