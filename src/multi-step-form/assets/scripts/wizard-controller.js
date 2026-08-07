class WizardController {
  minStep = 1;
  maxStep = 4;
  formState = {
    data: {},
    currentStepIndex: 1,
    isCurrentFormSubmitted: false,
  };

  get submitButtonElement() {
    return document.querySelector("form-footer button[type='submit']");
  }

  get backButtonElement() {
    return document.querySelector("form-footer button[type='button']");
  }

  get summaryElement() {
    return document.querySelector("form-step-4");
  }

  handleFormInput(event) {
    if (["billing-type", "plan", "add-ons"].includes(event.target.name))
      this.summaryElement.update(event.target.name);

    // Don't validate non-submitted forms
    if (!this.formState.isCurrentFormSubmitted) return true;

    if (this.validateForm(event.currentTarget)) {
      this.submitButtonElement.disabled = false;
    } else {
      this.submitButtonElement.disabled = true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const formElement = event.target;
    this.formState.isCurrentFormSubmitted = true;

    if (!this.validateForm(formElement)) {
      this.submitButtonElement.disabled = true;
      formElement.querySelector("input:invalid").focus();
      return;
    }

    const formData = new FormData(formElement);

    this.formState = {
      ...this.formState,
      data: {
        ...this.formState.data,
        ...Object.fromEntries(formData.entries()),
      },
    };

    const checkbox = formElement.querySelector('input[type="checkbox"]');
    if (checkbox)
      this.formState.data[checkbox.name] = [...formData.getAll(checkbox.name)];

    if (this.formState.currentStepIndex === 4) this.handleSend();
    else
      this.handleStepChange(
        this.formState.currentStepIndex,
        this.formState.currentStepIndex + 1,
      );
  }

  handleStepChange(oldStep, newStep) {
    if (newStep < this.minStep || newStep > this.maxStep) return;

    this.formState.currentStepIndex = newStep;
    this.formState.isCurrentFormSubmitted = false;

    document
      .querySelectorAll(".step-indicator li")
      .forEach((liElement, index) => {
        if (index + 1 === newStep) {
          liElement.setAttribute("aria-current", "step");
        } else {
          liElement.removeAttribute("aria-current");
        }
      });

    document.querySelector(`form-step-${oldStep}`).hidden = true;
    document.querySelector(`form-step-${newStep}`).hidden = false;

    if (newStep === this.minStep) this.backButtonElement.hidden = true;
    else this.backButtonElement.hidden = false;

    if (newStep === this.maxStep)
      this.submitButtonElement.textContent = "Confirm";
    else this.submitButtonElement.textContent = "Next Step";

    this.submitButtonElement.setAttribute(
      "form",
      document.querySelector(`form-step-${newStep} form`).id,
    );
  }

  handleSend() {
    // Send data to backend...
    document.querySelector(`form-step-4`).hidden = true;
    document.querySelector(`form-step-5`).hidden = false;
    document.querySelector("form-footer").hidden = true;
  }

  handleBack() {
    if (this.formState.currentStepIndex === 1) return;

    this.handleStepChange(
      this.formState.currentStepIndex,
      this.formState.currentStepIndex - 1,
    );
  }

  handlePlanChangeNavigation() {
    this.handleStepChange(this.formState.currentStepIndex, 2);
  }

  validateForm(formElement) {
    let isValid = true;
    const inputElements = formElement.querySelectorAll("input");

    inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        isValid = false;
        this.setError(inputElement);
      } else {
        this.clearError(inputElement);
      }
    });

    return isValid;
  }

  setError(inputElement) {
    const errorMessageElement = document.getElementById(
      `${inputElement.name}-error`,
    );
    const message = this.getErrorMessage(inputElement);

    inputElement.setAttribute("aria-invalid", "true");

    if (errorMessageElement.textContent !== message)
      errorMessageElement.textContent = message;
  }

  clearError(inputElement) {
    const errorMessageElement = document.getElementById(
      `${inputElement.name}-error`,
    );

    inputElement.removeAttribute("aria-invalid");

    // Some inputs do not have a possibility of erroring (eg. optional checkboxes)
    if (errorMessageElement?.textContent) errorMessageElement.textContent = "";
  }

  getErrorMessage(input) {
    if (input.validity.valueMissing) {
      return "This field is required.";
    } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
      return "Enter a valid value.";
    } else {
      return "Invalid input.";
    }
  }
}

export const wizardController = new WizardController();
