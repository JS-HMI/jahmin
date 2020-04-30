import { LitElement } from 'lit-element';
import { litStatesMixin } from 'impera-js';
import { Manager } from './ServiceManager.js';
import { systemVariable, VarStatusCodes } from './Types.js';
export class hmiElement extends litStatesMixin([Manager.dataTree, Manager.errorTray], LitElement) {
    constructor() {
        super();
        this.name = "";
        this.system = "default";
        this.engine = "default";
        this._init = false;
        this.service_manager = Manager;
    }
    static get properties() {
        return {
            name: { type: String },
            system: { type: String },
            engine: { type: String }
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
        Manager.Subscribe(this.engine, this).then(() => { this._init = true; });
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
    Update(Value, Status) {
        let sysVar = new systemVariable(this);
        sysVar.status = Status;
        sysVar.value = Value;
        this.UpdateMultiple(sysVar);
    }
    UpdateMultiple(sysvar) {
        Manager.Update(sysvar);
    }
}
