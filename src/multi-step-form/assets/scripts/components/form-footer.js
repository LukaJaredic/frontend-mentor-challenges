import { wizardController } from "../wizard-controller.js";
import { BaseElement } from "./base-element.js";

export class FormFooter extends BaseElement {
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", this.handleBackButtonClick.bind(this));
  }

  handleBackButtonClick(event) {
    if (event.target.type !== "button") return;

    wizardController.handleBack();
  }

  render() {
    return `
      <footer class="footer">
        <button class="btn-ghost" type="button" hidden>Go Back</button>
        <button class="btn-primary" type="submit" form="step-1-form">
          Next Step
        </button>
      </footer>
    `;
  }
}

customElements.define("form-footer", FormFooter);
