export function validateForm(form) {
  const inputs = form.querySelectorAll("input");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      isValid = false;
      setInputError(input);
    } else {
      clearInputError(input);
    }
  });

  return isValid;
}

function setInputError(input) {
  const formControl = input.closest(".form-control");
  const errorMessage = formControl.querySelector(".error-message");

  input.setAttribute("aria-invalid", "true");

  if (errorMessage) {
    errorMessage.textContent = getValidationMessage(input);
  } else {
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.textContent = getValidationMessage(input);
    formControl
      .querySelector(".form-control__header")
      .appendChild(errorElement);
  }
}

function clearInputError(input) {
  input.removeAttribute("aria-invalid");

  const formControl = input.closest(".form-control");
  formControl.querySelector(".error-message")?.remove();
}

function getValidationMessage(input) {
  if (input.validity.valueMissing) {
    return "This field is required.";
  } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "Enter a valid value.";
  } else {
    return "Invalid input.";
  }
}
