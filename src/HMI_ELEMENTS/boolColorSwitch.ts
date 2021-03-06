import {html,css, CSSResult} from 'lit-element'
import {hmiElement} from './HMIelement.js';
import {VarStatusCodes as vsc}  from '../DataModels/Types.js'


export class boolColorSwitch extends hmiElement {

    static get styles() : any
    {
        return css`
            :host{
                display:block;
                cursor : pointer;
            }
            slot, x-loader{
                display:none;
            }
            slot[show]{
                display:contents;
            }
            x-loader[show]{
                display:block;
            }
            slot {
                cursor : pointer;
            }
            :host([status="ERROR"]) > slot{
                cursor : not-allowed ;
            }
            :host([status="UNSUBSCRIBED"]) > slot{
                cursor : not-allowed ;
            }
            :host([read-only]) > slot{
                cursor : auto ;
            }
            [show]{
                display:block;
            }
            [val="on"]::slotted(*){
                stroke : var(--on-stroke-c,black);
                fill : var(--on-fill-c,green);
            }
            [val="off"]::slotted(*){
                stroke : var(--off-stroke-c,black);
                fill : var(--off-fill-c,lightgray);
            }
            :host([status="ERROR"]) > ::slotted(*){
                stroke : var(--error-stroke-c,black);
                fill : var(--error-fill-c,red);
            }
            :host([status="UNSUBSCRIBED"]) > ::slotted(*){
                stroke : var(--unsub-stroke-c,yellow);
            }
        `;
    }
    render()
    {
        return html`
            <slot val="${this.value ? "on" : "off"}" 
                  @click="${this.click}"
                  ?show="${this.status !== vsc.Pending}"> Empty Slot</slot>
            <x-loader ?show="${this.status === vsc.Pending}"></x-loader>
        `;
    }
    click()
    {
        let sts = this.status; // avoid the getter function call
        if(this.hasAttribute("read-only") || 
           sts === vsc.Error      || 
           sts === vsc.Pending    ||
           sts === vsc.Unsubscribed )  return;
        
        // this is a UI only element 
        // let toggle = this.value ? false : true;
        // this.Write(toggle);
    }
}
customElements.define("bool-color",boolColorSwitch);
