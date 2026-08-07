import { FormElement } from "./form-element.js";
import { billingTypes, plans } from "../consts.js";

export class FormStep2 extends FormElement {
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("input", this.handleBillingTypeChange.bind(this));
    this.addEventListener("click", this.handleBillingTypeToggle.bind(this));
  }

  handleBillingTypeToggle(event) {
    // indicator is not a button, but it looks like a button, so we will make it behave like one
    if (!event.target.classList.contains("billing-type__indicator")) return;

    const currentValue = this.querySelector(
      'input[name="billing-type"]:checked',
    ).value;
    const nextValue = currentValue === "monthly" ? "yearly" : "monthly";
    const nextValueElement = this.querySelector(
      `input[name="billing-type"][value="${nextValue}"]`,
    );

    nextValueElement.checked = true;
    nextValueElement.dispatchEvent(new Event("input", { bubbles: true }));
  }

  handleBillingTypeChange(event) {
    if (!(event.target.name === "billing-type")) return;
    const nextBillingValue = event.target.value;

    document
      .querySelectorAll("[data-type-yearly-content][data-type-monthly-content]")
      .forEach((element) => {
        element.textContent = element.getAttribute(
          `data-type-${nextBillingValue}-content`,
        );
      });
  }

  renderType({ value, label, isDefault = false }) {
    return `
      <input
        type="radio"
        id="billing-type-${value}"
        name="billing-type"
        value="${value}"
        class="sr-only"
        ${isDefault ? "checked" : ""}
      />
      <label for="billing-type-${value}">${label}</label>
    `;
  }

  renderPlan({ value, name, monthlyPrice, yearlyPrice, isDefault = false }) {
    return `
      <input
        type="radio"
        id="plan-${value}"
        name="plan"
        value="${value}"
        class="sr-only"
        ${isDefault ? "checked" : ""}
      />
      <label for="plan-${value}" aria-live="polite" aria-atomic="true">
        <div class="plan__content">
          <span class="plan__content__name">${name}</span>
          <span
            class="plan__content__price"
            data-type-yearly-content="$${yearlyPrice}/yr"
            data-type-monthly-content="$${monthlyPrice}/mo"
          >
            $${yearlyPrice}/yr
          </span>
          <span
            class="plan__content__savings"
            data-type-yearly-content="2 months free"
            data-type-monthly-content=""
          >
            2 months free
          </span>
        </div>
      </label>
    `;
  }

  render() {
    return `
      <header id="step-2-form-header">
        <h1 tabindex="-1">Select your plan</h1>
        <p>You have the option of monthly or yearly billing.</p>
      </header>
      <form id="step-2-form" novalidate>
        <fieldset class="billing-type">
          <legend class="sr-only">Select your billing type</legend>
          ${billingTypes.map(this.renderType).join('<div class="billing-type__indicator"></div>')}
        </fieldset>
        <fieldset class="plan">
          <legend class="sr-only">Select your plan</legend>
          ${plans.map(this.renderPlan).join("")}
        </fieldset>
      </form>
    `;
  }
}

customElements.define("form-step-2", FormStep2);
