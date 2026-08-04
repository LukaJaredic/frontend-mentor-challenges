export function validateForm(formElement) {
  let isValid = true;
  const inputElements = formElement.querySelectorAll("input");

  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      isValid = false;
      setError(inputElement);
    } else {
      clearError(inputElement);
    }
  });

  return isValid;
}

function setError(inputElement) {
  const errorMessageElement = document.getElementById(
    `${inputElement.name}-error`,
  );
  const message = getErrorMessage(inputElement);

  inputElement.setAttribute("aria-invalid", "true");

  if (errorMessageElement.textContent !== message)
    errorMessageElement.textContent = message;
}

function clearError(inputElement) {
  const errorMessageElement = document.getElementById(
    `${inputElement.name}-error`,
  );

  inputElement.removeAttribute("aria-invalid");
  errorMessageElement.textContent = "";
}

function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return "This field is required.";
  } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "Enter a valid value.";
  } else {
    return "Invalid input.";
  }
}
