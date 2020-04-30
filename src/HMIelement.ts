import {LitElement} from 'lit-element'
import {litStatesMixin} from 'impera-js'
import {Manager, ServiceManager} from './ServiceManager.js'
import {DataTree} from './DataTree.js'
import { systemObject, systemVariable, VarStatusCodes } from './Types.js';

export class hmiElement extends litStatesMixin([Manager.dataTree, Manager.errorTray],LitElement) implements systemObject{

    name   : string
    system : string
    engine : string
    datatree : any
    _init : boolean
    service_manager : ServiceManager

    constructor(){
        super();
        this.name   = "";
        this.system = "default";
        this.engine = "default";
        this._init = false;
        this.service_manager = Manager;
    }

    static get properties() { 
        return { 
          name   : { type: String },
          system : { type: String },
          engine : { type: String }
        };
    }

    get value():any
    {
        if(!this._init) return undefined;
        return this.datatree[this.system][this.name].value;
    }
    get status():string
    {
        if(!this._init) return VarStatusCodes.Pending;
        return this.datatree[this.system][this.name].status;
    }
    connectedCallback()
    {
        super.connectedCallback();
        // maybe here dispatch READY event??
        // maybe here resolve a READY promise so one can await it??
        Manager.Subscribe(this.engine,this).then(()=>{this._init = true;})
    }

    disconnectedCallback()
    {
        if(super.disconnectedCallback) super.disconnectedCallback();
        Manager.Unsubscribe(this.engine, this);
    }

    async Write(value:any)
    {
        return await this.WriteMultiple([this],[value]);
    }

    async WriteMultiple(targets:systemObject[],values:any[])
    {
        return await Manager.Write(this.engine, targets, values);
    }

    async Read()
    {
        return this.ReadMultiple([this]);
    }

    async ReadMultiple(targets:systemObject[])
    {
        return await Manager.Read(this.engine,targets);
    }

    Update(Value:any, Status:string):void
    {
        let sysVar = new systemVariable(this);
        sysVar.status = Status;
        sysVar.value = Value;
        this.UpdateMultiple(sysVar);
    }

    UpdateMultiple(sysvar:systemVariable[]|systemVariable):void
    {
        Manager.Update(sysvar)
    }
}
