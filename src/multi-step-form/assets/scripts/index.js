/*
    -------------MAIN-----------------
*/
const mainElement = document.querySelector("main");
const submitButtonElement = document.querySelector('button[type="submit"]');
const backButtonElement = document.querySelector('button[type="button"]');

let formState = {
  data: {},
  currentStepIndex: 1,
  isCurrentFormSubmitted: false,
};

registerFormEventHandlers();

backButtonElement.addEventListener("click", () => {
  handleStepChange(formState.currentStepIndex, formState.currentStepIndex - 1);
});

/*
    ------------END-MAIN-----------------
    BELOW ARE FUNCTIONS CALLED FROM MAIN
    -------------------------------------
*/

import { validateForm } from "./validation";

function registerFormEventHandlers() {
  const steps = [
    1, 2,
    // 3, 4
  ];

  steps.forEach((step) => {
    const formElement = document.getElementById(`step-${step}-form`);
    // Indicator looks clickable, so we will add click listener to it
    const toggleBillingTypeIndicatorElement = formElement.querySelector(
      ".billing-type__indicator",
    );

    // Remove possible stale handlers
    formElement.removeEventListener("submit", handleSubmit);
    formElement.removeEventListener("input", handleBillingTypeChange);
    formElement.removeEventListener("input", handleFormInput);
    toggleBillingTypeIndicatorElement?.removeEventListener(
      "click",
      handleBillingTypeToggle,
    );

    // Only register handlers for the current step
    if (step === formState.currentStepIndex) {
      formElement.addEventListener("submit", handleSubmit);
      formElement.addEventListener("input", handleBillingTypeChange);
      formElement.addEventListener("input", handleFormInput);
      formElement;
      toggleBillingTypeIndicatorElement?.addEventListener(
        "click",
        handleBillingTypeToggle,
      );
      submitButtonElement.setAttribute("form", formElement.id);
    }
  });
}

function handleFormInput(event) {
  // Don't validate non-submitted forms
  if (!formState.isCurrentFormSubmitted) return true;

  if (validateForm(event.currentTarget)) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const formElement = event.target;
  formState.isCurrentFormSubmitted = true;

  if (!validateForm(formElement)) {
    submitButtonElement.disabled = true;
    formElement.querySelector("input:invalid").focus();
    return;
  }

  formState = {
    ...formState,
    data: {
      ...formState.data,
      ...Object.fromEntries(new FormData(event.target).entries()),
    },
  };

  handleStepChange(formState.currentStepIndex, formState.currentStepIndex + 1);
}

function handleBillingTypeChange(event) {
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

function handleBillingTypeToggle(event) {
  const formElement = event.currentTarget.closest("form");
  const currentValue = formElement.querySelector(
    'input[name="billing-type"]:checked',
  ).value;
  const nextValue = currentValue === "monthly" ? "yearly" : "monthly";
  const nextValueElement = formElement.querySelector(
    `input[name="billing-type"][value="${nextValue}"]`,
  );

  nextValueElement.checked = true;
  nextValueElement.dispatchEvent(new Event("input", { bubbles: true }));
}

function handleStepChange(oldStep, newStep) {
  formState.currentStepIndex = newStep;
  formState.isCurrentFormSubmitted = false;

  document
    .querySelectorAll(".step-indicator li")
    .forEach((liElement, index) => {
      if (index + 1 === newStep) {
        liElement.setAttribute("aria-current", "step");
      } else {
        liElement.removeAttribute("aria-current");
      }
    });

  document.getElementById(`step-${oldStep}-form`).hidden = true;
  document.getElementById(`step-${oldStep}-form-header`).hidden = true;

  document.getElementById(`step-${newStep}-form`).hidden = false;
  document.getElementById(`step-${newStep}-form-header`).hidden = false;

  if (newStep === 1) backButtonElement.hidden = true;
  else backButtonElement.hidden = false;

  registerFormEventHandlers();
}
