import { LitElement, css, html } from 'lit-element';
export class positionElement extends LitElement {
    constructor() {
        super(...arguments);
        this.orientation = "N";
        this.top = 0;
        this.left = 0;
    }
    static get styles() {
        return [css `
        :host{
            display:block;
        }
        :host{
            position: relative;
        }
        :host([orientation="E"]) 
        {
            transform: rotate(90deg); 
        }
        :host([orientation="S"]) 
        {
            transform: rotate(180deg); 
        }
        :host([orientation="W"]) 
        {
            transform: rotate(270deg); 
        }
        
        `];
    }
    static get properties() {
        return {
            orientation: { type: String },
            top: { type: Number },
            left: { type: Number }
        };
    }
    render() {
        return html `
            <style>
                :host
                {
                    top : ${this.top}%;
                    left : ${this.left}%;
                }
            </style>
            <slot></slot>
        `;
    }
}
customElements.define("x-position", positionElement);
