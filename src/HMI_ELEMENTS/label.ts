import {html, css} from 'lit-element'
import {hmiElement} from './HMIelement.js'
import { shadow_normalize } from './normalize.css.js';
import './positioning.js'
import type {props} from "./HMIelement.js"

export class hmiLabel extends hmiElement 
{
    orientation = "N";
   
    static get properties()
    {
        let x = super.properties;
        x.orientation = {type:String};
        return x;
    }
    
    static get styles()
    {
        return [shadow_normalize,css`
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
                box-sizing:border-box;
            }
            :host([orientation="W"])
            {
                flex-direction : row;
            }
            :host([orientation="E"])
            {
                flex-direction : row;
            }
            :host([orientation="E"])>div{
                margin-right : 0.2rem;
            }
            :host([orientation="W"])>div{
                margin-right : 0.2rem;
            }
            div{
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.3rem);
                font-family: 'Roboto', sans-serif;
                margin-bottom : 0.2rem;
                width:100%;
                flex:1;
                max-width: 5rem;
                max-height: calc(1rem + 2*var(--padding,0.2rem));
                text-align:center;
                color:var(--base-color,#333333);
            }
            x-position{
                flex:2;
                display:flex;
                justify-content : center;
                align-items : center;
            }
            ::slotted(*)
            {
                min-height:1rem;
                min-width:1rem;
            }
            :host([status="ERROR"]) > div{
                color : var(--error-color,red);
            }
            :host([status="WARNING"]) > div{
                color : var(--warning-color,orange);
            }
        `];
    }
    render(){
        return html`
            <div><strong><slot name="label">${this.name}</slot></strong></div>
            <x-position orientation="${this.orientation}">
                <slot>Empty Slot</slot>
            </x-position>
        `;
    }
}
customElements.define("hmi-label",hmiLabel);