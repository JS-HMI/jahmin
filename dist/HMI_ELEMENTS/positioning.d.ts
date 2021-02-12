import { LitElement } from 'lit-element';
export declare class positionElement extends LitElement {
    orientation: string;
    top: number;
    left: number;
    static get styles(): import("lit-element").CSSResult[];
    static get properties(): {
        orientation: {
            type: StringConstructor;
        };
        top: {
            type: NumberConstructor;
        };
        left: {
            type: NumberConstructor;
        };
    };
    render(): import("lit-element").TemplateResult;
}
