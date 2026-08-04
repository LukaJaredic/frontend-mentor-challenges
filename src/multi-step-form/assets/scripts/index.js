import { validateForm } from "./validation";

/*
    ---------MAIN-----------
*/

const mainElement = document.querySelector("main");
const submitButton = document.querySelector('button[type="submit"]');
const backButton = document.querySelector('button[type="button"]');

let formState = {
  isCurrentFormSubmitted: false,
  currentStepIndex: 1,
  data: {},
};

registerFormEventHandlers();

backButton.addEventListener("click", () => {
  handleStepChange(formState.currentStepIndex, formState.currentStepIndex - 1);
});

/*
    --------END-MAIN---------
*/

function registerFormEventHandlers() {
  const steps = [
    1,
    // 2, 3, 4
  ];

  steps.forEach((step) => {
    const form = document.getElementById(`step-${step}-form`);
    // Remove possible stale handlers
    form.removeEventListener("submit", handleSubmit);
    form.removeEventListener("input", handleFormInput);

    // Only register handlers for the current step
    if (step === formState.currentStepIndex) {
      form.addEventListener("submit", handleSubmit);
      form.addEventListener("input", handleFormInput);
      submitButton.setAttribute("form", form.id);
    }
  });
}

function handleFormInput(event) {
  // Don't validate non-submitted forms
  if (!formState.isCurrentFormSubmitted) return;

  if (validateForm(event.currentTarget)) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "true");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  formState.isCurrentFormSubmitted = true;

  if (!validateForm(form)) {
    submitButton.setAttribute("disabled", "true");
    form.querySelector("input:invalid").focus();
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

function handleStepChange(oldStep, newStep) {
  formState.currentStepIndex = newStep;
  formState.isCurrentFormSubmitted = false;

  document.querySelectorAll(".step-indicator li").forEach((li, index) => {
    if (index + 1 === newStep) {
      li.setAttribute("aria-current", "step");
    } else {
      li.removeAttribute("aria-current");
    }
  });

  document.getElementById(`step-${oldStep}-form`).hidden = true;
  document.getElementById(`step-${oldStep}-form-header`).hidden = true;

  document.getElementById(`step-${newStep}-form`).hidden = false;
  document.getElementById(`step-${newStep}-form-header`).hidden = false;

  if (newStep === 1) backButton.hidden = true;
  else backButton.hidden = false;

  registerFormEventHandlers();
}
