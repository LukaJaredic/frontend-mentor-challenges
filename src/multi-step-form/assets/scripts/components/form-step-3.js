import { FormElement } from "./form-element.js";
import { addOns } from "../consts.js";

export class FormStep3 extends FormElement {
  renderCheckbox({ name, description, priceMonthly, priceYearly, value }) {
    return `
      <input
        type="checkbox"
        id="add-on-${value}"
        name="add-ons"
        class="sr-only"
        value="${value}"
      />
      <label for="add-on-${value}">
        <div class="add-ons__text-content">
          <span class="add-ons__text-content__name">${name}</span>
          <span class="add-ons__text-content__description">${description}</span>
        </div>
        <span
          class="add-ons__price"
          data-type-monthly-content="+$${priceMonthly}/mo"
          data-type-yearly-content="+$${priceYearly}/yr"
        >
          +$${priceYearly}/yr
        </span>
      </label>
    `;
  }

  render() {
    return `
      <header id="step-3-form-header">
        <h1 tabindex="-1">Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience.</p>
      </header>
      <form id="step-3-form" novalidate>
        <fieldset class="add-ons">
          <legend class="sr-only">Select your add-ons</legend>
         ${addOns.map(this.renderCheckbox).join("")}
        </fieldset>
      </form>
    `;
  }
}

customElements.define("form-step-3", FormStep3);
