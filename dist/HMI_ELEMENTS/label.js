import { html, css } from 'lit-element';
import { hmiElement } from './HMIelement.js';
export class hmiLabel extends hmiElement {
    static get styles() {
        return css `
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
            }
            div{
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.2rem);
                font-family: 'Roboto', sans-serif;
                margin-bottom : 0.2rem;
                width:100%;
                text-align:center;
                color:var(--base-color,#333333);
            }
            :host([status="ERROR"]) > div{
                color : var(--error-color,red);
            }
            :host([status="WARNING"]) > div{
                color : var(--warning-color,orange);
            }
        `;
    }
    render() {
        return html `
            <div><strong><slot name="label">${this.name}</slot></strong></div>
            <slot>Empty Slot</slot>
        `;
    }
}
customElements.define("hmi-label", hmiLabel);
