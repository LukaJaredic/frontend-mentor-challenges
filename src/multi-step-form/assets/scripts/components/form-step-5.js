import { FormElement } from "./form-element.js";

export class FormStep5 extends FormElement {
  render() {
    return `
      <section class="thank-you">
        <h1 tabindex="-1">Thank you!</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </section>
    `;
  }
}

customElements.define("form-step-5", FormStep5);
