import { wizardController } from "../wizard-controller.js";
import { FormElement } from "./form-element.js";

export class FormStep1 extends FormElement {
  namePattern = "^(\\w{1,50}(\\s|-)\\w{1,50})+$";
  phonePattern = "^\\+?(\\d| |-){4,20}$";
  inputs = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "e.g. Stephen King",
      pattern: this.namePattern,
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "e.g. stephenking@lorem.com",
      required: true,
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "e.g. +1 234 567 890",
      pattern: this.phonePattern,
      required: true,
    },
  ];

  renderInput({
    id,
    name,
    label,
    type,
    placeholder,
    pattern,
    required = false,
  }) {
    return `
      <div class="form-control">
        <div class="form-control__header">
          <label for="${id}">${label}</label>
          <p
            class="form-control__error-message"
            id="${id}-error"
            aria-live="polite"
            aria-atomic="true"
          ></p>
        </div>
        <input
          id="${id}"
          name="${name}"
          type="${type}"
          placeholder="${placeholder}"
          ${pattern ? `pattern="${pattern}"` : ""}
          aria-invalid="false"
          aria-describedby="${id}-error"
          ${required ? "required" : ""}
        />
      </div>
    `;
  }

  render() {
    return `
      <header id="step-1-form-header">
        <h1>Personal info</h1>
        <p>Please provide your name, email address, and phone number.</p>
      </header>
      <form id="step-1-form" novalidate>
          ${this.inputs.map(this.renderInput).join("")}
      </form>
    `;
  }
}

customElements.define("form-step-1", FormStep1);
