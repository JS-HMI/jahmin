import {html,css, LitElement} from 'lit-element'
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
           
        `;
    }
    render()
    {
        return html`
        <p>Ciao</p> <slot><p>in slot</p></slot>
        `;
    }
    onclick()
    {
        let sts = this.status; // avoid the getter function call
        if(this.hasAttribute("read-only") || 
           sts === vsc.Error      || 
           sts === vsc.Pending    ||
           sts === vsc.Unsubscribed )  return;
        
        let toggle = this.value ? false : true;
        this.Write(toggle);
    }
}
customElements.define("bool-color",boolColorSwitch);

export class ValvePR1 extends LitElement {
  
    name:string
    system:string
    engine:string

    constructor(){
        super();
        this.name   = "";
        this.system = "default";
        this.engine = "default";
    }

    static get properties() { 
        return { 
          name   : { type: String },
          system : { type: String },
          engine : { type: String },
        };
    }
    static get styles()
    {
        return css`
            :host{
                display:block;
            }
            .container{
                display:flex;
                flex-direction:column;
                align-items:center;
            }
            div.label{
                font-family: 'Roboto', sans-serif;
                border : solid 1px gray;
                border-radius: 0.5rem;
                padding:0.3rem;
                margin-bottom : 0.2rem;
                width:100%;
                text-align:center;
            }
            div[err]{
                color : red;
            }
        `;
    }
    render()
    {
        return html`
        <div class="container">
            <div class="label">
            <strong >${this.name}</strong>
            </div>
            <p>wat</p>
            <bool-color> 
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path style="fill: none; stroke:black; stroke-width: 75;" d="M 238 38 C 362.264 38 463 138.736 463 263"></path>
            </svg>
        </bool-color>
        </div>
        `;
    }
}
customElements.define("valve-pr1",ValvePR1);

class ex extends HTMLElement{
    constructor(){
        super();
        let swr = this.attachShadow({mode:"open"})
        swr.innerHTML = `<p>Ciao</p> <slot><p>in slot</p></slot> 
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path style="fill: none; stroke:black; stroke-width: 75;" d="M 238 38 C 362.264 38 463 138.736 463 263"></path>
        </svg>
        `;
    }
}

customElements.define("e-x",ex);


class ex2 extends LitElement{
    static get styles() : any
    {
        return css`
            :host{
                display:block;
                cursor : pointer;
            }
           
        `;
    }
    render(){
        return html`
        <p>Ciao</p> <slot><p>in slot</p></slot>
        `;
    }
}

customElements.define("e-x2",ex2);