import { dataManager } from './DataManager.js';
import { Actions } from './Types.js';
/**Abstract class defining a Comunication Engine for data I/O with a server.*/
export class DataCommsEngine {
    constructor(systemName) {
        this.manager = dataManager;
        this.name = "DataEngine";
        this.sub_cache = new Set();
        this.unsub_cache = new Set();
        this.subs_count = {};
        this.sub_timerID = null;
        this.unsub_timerID = null;
        this.bufferTime = 10;
        this.system = systemName;
    }
    SetBufferTime(time_ms) {
        this.bufferTime = time_ms;
    }
    RequestSubscription(target) {
        if (this.subs_count.hasOwnProperty(target.name))
            this.subs_count[target.name] += 1;
        else
            this.subs_count[target.name] = 1;
        this.sub_cache.add(target.name);
        if (this.sub_timerID)
            clearTimeout(this.sub_timerID);
        this.sub_timerID = setTimeout(this._subcribe.bind(this), this.bufferTime);
    }
    RequestUnsubscription(target) {
        if (!this.subs_count.hasOwnProperty(target.name))
            return;
        this.subs_count[target.name] -= 1;
        this.unsub_cache.add(target.name);
        if (this.subs_count[target.name] === 0) {
            if (this.unsub_timerID)
                clearTimeout(this.unsub_timerID);
            this.unsub_timerID = setTimeout(this._unsubcribe.bind(this), this.bufferTime);
        }
    }
    async _subcribe() {
        let resp = await this.Subscribe(Array.from(this.sub_cache));
        this.sub_cache.clear();
        this.manager.RaiseError(resp, Actions.Subscribe, this);
    }
    async _unsubcribe() {
        let resp = await this.Unsubscribe(Array.from(this.unsub_cache));
        this.unsub_cache.clear();
        this.manager.RaiseError(resp, Actions.Unsubscribe, this);
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
