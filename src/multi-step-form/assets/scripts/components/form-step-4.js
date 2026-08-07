import { FormElement } from "./form-element.js";
import { plans, addOns, priceMap } from "../consts.js";

export class FormStep4 extends FormElement {
  price = { base: 9, addOns: 0, multiplier: 10 };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleChangePlanClick);
    this.update("plan");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleChangePlanClick);
  }

  get addOnsUlElement() {
    return this.querySelector(".summary__add-ons");
  }

  get addOnsLiElements() {
    return this.querySelectorAll("[data-add-on-name]");
  }

  get totalPriceElement() {
    return this.querySelector(".total__price");
  }

  get nextValues() {
    return {
      nextBillingType: document.querySelector("[name='billing-type']:checked")
        .value,
      nextPlan: document.querySelector("[name='plan']:checked").value,
      nextAddOns: new FormData(
        document.querySelector("[name='add-ons']").closest("form"),
      ).getAll("add-ons"),
    };
  }

  update(changedInputName) {
    const { nextBillingType, nextPlan, nextAddOns } = this.nextValues;

    if (changedInputName === "plan") this.updatePlan(nextPlan);
    if (changedInputName === "add-ons") this.updateAddOns(nextAddOns);
    this.updatePrice(nextBillingType, nextPlan, nextAddOns);

    this.totalPriceElement.textContent = `$${(this.price.base + this.price.addOns) * this.price.multiplier}/${nextBillingType === "monthly" ? "mo" : "yr"}`;
  }

  updatePlan(nextPlan) {
    this.querySelectorAll("[data-plan-name]").forEach((element) =>
      element.getAttribute("data-plan-name") === nextPlan
        ? (element.hidden = false)
        : (element.hidden = true),
    );
  }

  updateAddOns(nextAddOns) {
    if (nextAddOns.length === 0) this.addOnsUlElement.hidden = true;
    else this.addOnsUlElement.hidden = false;

    this.addOnsLiElements.forEach((element) =>
      nextAddOns.includes(element.getAttribute("data-add-on-name"))
        ? (element.hidden = false)
        : (element.hidden = true),
    );
  }

  updatePrice(nextBillingType, nextPlan, nextAddOns) {
    this.price.base = priceMap.plan[nextPlan];
    this.price.addOns = nextAddOns.reduce(
      (acc, addOn) => acc + priceMap.addOns[addOn],
      0,
    );
    this.price.multiplier = nextBillingType === "monthly" ? 1 : 10;
  }

  handleChangePlanClick(event) {
    if (!event.target.classList.contains("summary__plan__change")) return;

    this.wizardController.handlePlanChangeNavigation();
  }

  renderPlanTitle({ name, value, monthlyPrice, yearlyPrice }) {
    return `
      <span
        class="summary__plan__name"
        data-plan-name="${value}"
        data-type-monthly-content="${name} (Monthly)"
        data-type-yearly-content="${name} (Yearly)"
        hidden
      >
        ${name} (Yearly)
      </span>
    `;
  }

  renderPlanPrice({ value, monthlyPrice, yearlyPrice }) {
    return `
      <span
        class="summary__plan__price"
        data-plan-name="${value}"
        data-type-monthly-content="$${monthlyPrice}/mo"
        data-type-yearly-content="$${yearlyPrice}/yr"
        hidden
      >
        $${yearlyPrice}/yr
      </span>
    `;
  }

  renderAddOn({ name, description, priceMonthly, priceYearly, value }) {
    return `
      <li data-add-on-name="${value}" hidden>
        <span class="summary__add-ons__name">${name}</span>
        <span
          class="summary__add-ons__price"
          data-type-monthly-content="+$${priceMonthly}/mo"
          data-type-yearly-content="+$${priceYearly}/yr"
        >
          +$${priceYearly}/yr
        </span>
      </li>
    `;
  }

  render() {
    return `
      <header id="step-4-form-header">
        <h1 tabindex="-1">Finishing up</h1>
        <p>Double-check everything looks OK before confirming.</p>
      </header>
      <form id="step-4-form" novalidate>
        <input type="hidden" name="confirmed" value="true" />
        <ul class="summary">
          <li class="summary__plan">
            <span>
              ${plans.map(this.renderPlanTitle).join("")}
              <button type="button" class="summary__plan__change">
                Change
              </button>
            </span>
            ${plans.map(this.renderPlanPrice).join("")}
          </li>
          <li class="summary__add-ons" hidden>
            <ul>
              ${addOns.map(this.renderAddOn).join("")}
            </ul>
          </li>
        </ul>
        <p class="total">
          <span
            class="total__title"
            data-type-monthly-content="Total (per month)"
            data-type-yearly-content="Total (per year)"
          >
            Total (per year)
          </span>
          <span class="total__price"></span>
        </p>
      </form>
    `;
  }
}

customElements.define("form-step-4", FormStep4);
