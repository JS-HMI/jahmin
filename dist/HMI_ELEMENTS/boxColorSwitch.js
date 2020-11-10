import { hmiElement } from './HMIelement.js';
import { css, html } from 'lit-element';
export class colorBox extends hmiElement {
    static get styles() {
        return css `
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items: center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.4rem);
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                background-color: var(--default-color, #ffffff);
            }
            :host([status="ERROR"]) {
                background-color: var(--err-color, #ff726f);
            }
            :host([status="UNSUBSCRIBED"]) {
                background-color: var(--unsub-color, yellow);
            }
            :host([status="WARNING"]) {
                background-color: var(--warn-color, orange);
            }
        `;
    }
    render() {
        return html `
            <slot>Empty Slot</slot>
        `;
    }
}
customElements.define("color-box", colorBox);
