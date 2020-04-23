import {LitElement} from 'lit-element'
import {litStatesMixin} from 'impera-js'
import {Manager, ServiceManager} from './ServiceManager.js'
import {DataTree} from './DataTree.js'
import { systemObject, systemVariable, VarStatusCodes } from './Types.js';

export class hmiElement extends litStatesMixin([Manager.dataTree, Manager.errorTray],LitElement) implements systemObject{

    name   : string
    system : string
    datatree : any
    _init : boolean
    service_manager : ServiceManager

    constructor(){
        super();
        this.name   = "";
        this.system = "";
        this._init = false;
        this.service_manager = Manager;
    }

    static get properties() { 
        return { 
          name   : { type: String },
          system : { type: String }
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
        Manager.Subscribe(this).then(()=>{this._init = true;})
    }

    disconnectedCallback()
    {
        if(super.disconnectedCallback) super.disconnectedCallback();
        Manager.Unsubscribe(this);
    }

    async Write(value:any)
    {
        return await this.WriteMultiple([this.name],[value]);
    }

    async WriteMultiple(names:string[],values:any[])
    {
        return await Manager.Write(this.system, names, values);
    }

    async Read()
    {
        return this.ReadMultiple([this.name]);
    }

    async ReadMultiple(names:string[])
    {
        return await Manager.Read(this.system,names);
    }

    Update(Value:any, Status:string):void
    {
        this.UpdateMultiple({name:this.name, value:Value, status: Status })
    }

    UpdateMultiple(sysvar:systemVariable[]|systemVariable):void
    {
        Manager.Update(this.system,sysvar)
    }
}
