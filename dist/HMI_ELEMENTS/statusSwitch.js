import { hmiElement } from './HMIelement.js';
import { html, css } from 'lit-element';
import { VarStatusCodes as vsc } from '../DataModels/Types.js';
import './loader.js';
export class statusSwitch extends hmiElement {
    static get styles() {
        return css `
        
            :host{
                display: block;
            }
            * {
                display : none;
            }
            x-loader{
                --color : var(--loaderColor);
            }

            [show]{
                display:block;
            }
        `;
    }
    render() {
        return html `
        <x-loader ?show="${this.status === vsc.Pending}" > </x-loader>
        <slot  ?show="${this.status === vsc.Subscribed}" name="sub"></slot>
        <slot  ?show="${this.status === vsc.Unsubscribed}" name="unsub"> </slot>
        <slot  ?show="${this.status === vsc.Error}" name="error"> </slot>
        `;
    }
}
//@ts-ignore
customElements.define("status-switch", statusSwitch);
