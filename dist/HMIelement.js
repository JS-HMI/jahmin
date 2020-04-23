import { LitElement } from 'lit-element';
import { litStatesMixin } from 'impera-js';
import { Manager } from './ServiceManager.js';
import { VarStatusCodes } from './Types.js';
export class hmiElement extends litStatesMixin([Manager.dataTree, Manager.errorTray], LitElement) {
    constructor() {
        super();
        this.name = "";
        this.system = "";
        this._init = false;
        this.service_manager = Manager;
    }
    static get properties() {
        return {
            name: { type: String },
            system: { type: String }
        };
    }
    get value() {
        if (!this._init)
            return undefined;
        return this.datatree[this.system][this.name].value;
    }
    get status() {
        if (!this._init)
            return VarStatusCodes.Pending;
        return this.datatree[this.system][this.name].status;
    }
    connectedCallback() {
        super.connectedCallback();
        // maybe here dispatch READY event??
        // maybe here resolve a READY promise so one can await it??
        Manager.Subscribe(this).then(() => { this._init = true; });
    }
    disconnectedCallback() {
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        Manager.Unsubscribe(this);
    }
    async Write(value) {
        return await this.WriteMultiple([this.name], [value]);
    }
    async WriteMultiple(names, values) {
        return await Manager.Write(this.system, names, values);
    }
    async Read() {
        return this.ReadMultiple([this.name]);
    }
    async ReadMultiple(names) {
        return await Manager.Read(this.system, names);
    }
    Update(Value, Status) {
        this.UpdateMultiple({ name: this.name, value: Value, status: Status });
    }
    UpdateMultiple(sysvar) {
        Manager.Update(this.system, sysvar);
    }
}
