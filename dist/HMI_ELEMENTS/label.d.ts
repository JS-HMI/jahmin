import { hmiElement } from './HMIelement.js';
import './positioning.js';
import type { props } from "./HMIelement.js";
export declare class hmiLabel extends hmiElement {
    orientation: string;
    static get properties(): props;
    static get styles(): import("lit-element").CSSResult[];
    render(): import("lit-element").TemplateResult;
}
