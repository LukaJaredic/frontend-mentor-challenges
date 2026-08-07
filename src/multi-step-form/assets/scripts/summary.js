const summaryElement = document.querySelector(".summary");
const summaryAddOnsUlElement =
  summaryElement.querySelector(".summary__add-ons");
const summaryAddOnsLiElements =
  summaryElement.querySelectorAll("[data-add-on-name]");
const totalPriceElement = document.querySelector(".total__price");

const priceMap = {
  plan: {
    arcade: 9,
    advanced: 12,
    pro: 15,
  },
  addOns: {
    "online-service": 1,
    "larger-storage": 2,
    "customizable-profile": 2,
  },
};
let price = { base: 9, addOns: 0, multiplier: 10 };

function updateSummary(changedInput) {
  if (!["plan", "add-ons", "billing-type"].includes(changedInput.name)) return;

  const { nextBillingType, nextPlan, nextAddOns } = getNextValues();

  if (changedInput.name === "plan") updatePlan(nextPlan);
  if (changedInput.name === "add-ons") updateAddOns(nextAddOns);
  updatePrice(nextBillingType, nextPlan, nextAddOns);

  totalPriceElement.textContent = `$${(price.base + price.addOns) * price.multiplier}/${nextBillingType === "monthly" ? "mo" : "yr"}`;
}

function getNextValues() {
  return {
    nextBillingType: document.querySelector("[name='billing-type']:checked")
      .value,
    nextPlan: document.querySelector("[name='plan']:checked").value,
    nextAddOns: new FormData(
      document.querySelector("[name='add-ons']").closest("form"),
    ).getAll("add-ons"),
  };
}

function updatePlan(nextPlan) {
  summaryElement
    .querySelectorAll("[data-plan-name]")
    .forEach((element) =>
      element.getAttribute("data-plan-name") === nextPlan
        ? (element.hidden = false)
        : (element.hidden = true),
    );
}

function updateAddOns(nextAddOns) {
  if (nextAddOns.length === 0) summaryAddOnsUlElement.hidden = true;
  else summaryAddOnsUlElement.hidden = false;

  summaryAddOnsLiElements.forEach((element) =>
    nextAddOns.includes(element.getAttribute("data-add-on-name"))
      ? (element.hidden = false)
      : (element.hidden = true),
  );
}

function updatePrice(nextBillingType, nextPlan, nextAddOns) {
  price.base = priceMap.plan[nextPlan];
  price.addOns = nextAddOns.reduce(
    (acc, addOn) => acc + priceMap.addOns[addOn],
    0,
  );
  price.multiplier = nextBillingType === "monthly" ? 1 : 10;
}

export { updateSummary };
