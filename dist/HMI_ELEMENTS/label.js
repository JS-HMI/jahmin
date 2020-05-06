import { html, css } from 'lit-element';
import { hmiElement } from './HMIelement.js';
export class HmiLabel extends hmiElement {
    static get styles() {
        return css `
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
            }
            div{
                border: 1px solid grey;
                border-radius : 0.4rem;
                padding: 0.2rem;
                font-family: 'Roboto', sans-serif;
                margin-bottom : 0.2rem;
                width:100%;
                text-align:center;
                color:#333333;
            }
            :host([status="ERROR"]) > div{
                color : red;
            }
            :host([status="WARNING"]) > div{
                color : orange;
            }
        `;
    }
    render() {
        return html `
            <div><strong>${this.name}</strong></div>
            <slot>Empty Slot</slot>
        `;
    }
}
//@ts-ignore
customElements.define("hmi-label", HmiLabel);
