import { LitElement } from 'lit-element';
import { litStatesMixin } from 'impera-js';
import { Manager } from '../ServiceManager.js';
import { systemVariable, VarStatusCodes } from '../DataModels/Types.js';
export class hmiElement extends litStatesMixin([Manager.dataTree, Manager.errorTray], LitElement) {
    constructor() {
        super();
        this.name = "";
        this.system = "default";
        this.engine = "default";
        this._init = false;
        this.service_manager = Manager;
        this._local_status = "UNDEFINED";
        this._local_value = undefined;
    }
    static get properties() {
        return {
            name: { type: String },
            system: { type: String },
            engine: { type: String },
        };
    }
    get value() {
        if (!this._init)
            return undefined;
        if (this.service_manager.dataTree.ExistVar(this))
            return this.datatree[this.system][this.name].value;
        else
            return null;
    }
    get status() {
        if (!this._init)
            return VarStatusCodes.Pending;
        if (this.service_manager.dataTree.ExistVar(this))
            return this.datatree[this.system][this.name].status;
        else
            return VarStatusCodes.Error;
    }
    set status(Status) {
        if (typeof Status !== "string")
            return;
        if (!this.service_manager.dataTree.ExistVar(this))
            return;
        const old_val = this.getAttribute("status");
        if (old_val !== Status || old_val !== this.status) {
            this.DataUpdate(null, Status);
        }
    }
    on_datatree_update() {
        this.setAttribute("status", this.status);
        if (this.status !== this._local_status) {
            let Ev = new CustomEvent("status-changed", {
                bubbles: true, composed: true, cancelable: true,
                detail: { newStatus: this.status, oldStatus: this._local_status }
            });
            this._local_status = this.status;
            this.dispatchEvent(Ev);
        }
        if (this.value !== this._local_value) {
            let Ev = new CustomEvent("value-changed", {
                bubbles: true, composed: true, cancelable: true,
                detail: { newValue: this.value, oldValue: this._local_value }
            });
            this._local_value = this.value;
            this.dispatchEvent(Ev);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // maybe here dispatch READY event??
        // maybe here resolve a READY promise so one can await it??
        Manager.Subscribe(this.engine, this).then(() => {
            this._init = true;
            this.on_datatree_update();
            this.requestUpdate();
        });
    }
    disconnectedCallback() {
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        Manager.Unsubscribe(this.engine, this);
    }
    async Write(value) {
        return await this.WriteMultiple([this], [value]);
    }
    async WriteMultiple(targets, values) {
        return await Manager.Write(this.engine, targets, values);
    }
    async Read() {
        return this.ReadMultiple([this]);
    }
    async ReadMultiple(targets) {
        return await Manager.Read(this.engine, targets);
    }
    DataUpdate(Value, Status) {
        let sysVar = new systemVariable(this);
        sysVar.status = Status;
        sysVar.value = Value;
        this.DataUpdateMultiple(sysVar);
    }
    DataUpdateMultiple(sysvar) {
        Manager.Update(sysvar);
    }
}
customElements.define("hmi-element", hmiElement);
