import { wizardController } from "../wizard-controller.js";
import { BaseElement } from "./base-element.js";

export class FormElement extends BaseElement {
  constructor() {
    super();
    this.wizardController = wizardController;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      "submit",
      wizardController.handleSubmit.bind(wizardController),
    );
    this.addEventListener(
      "input",
      wizardController.handleFormInput.bind(wizardController),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(
      "submit",
      wizardController.handleSubmit.bind(wizardController),
    );
    this.removeEventListener(
      "input",
      wizardController.handleFormInput.bind(wizardController),
    );
  }
}
