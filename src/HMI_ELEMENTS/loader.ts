import {css, html, LitElement} from 'lit-element'

export class Loader extends LitElement {

    static get styles(){
        return css `
            :host{
                display:block;
            }
            path{
                stroke: var(--color, #3498db);
            }
            .loader {
                animation: spin var(--speed,0.7s) linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
    }

    render(){
        return html`
        <svg class="loader" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path style="fill: none; stroke-width: 75;" d="M 238 38 C 362.264 38 463 138.736 463 263"></path>
        </svg>
        `;
    }
}
customElements.define("x-loader",Loader);