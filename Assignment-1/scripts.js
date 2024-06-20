document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      successMessage.style.display = "block";
    }
  });

  form.addEventListener("reset", () => {
    clearValidationMessages();
    successMessage.style.display = "none";
  });

  fullName.addEventListener("input", () => validateFullName());
  email.addEventListener("input", () => validateEmail());
  phoneNumber.addEventListener("input", () => validatePhoneNumber());
  password.addEventListener("input", () => validatePassword());
  confirmPassword.addEventListener("input", () => validateConfirmPassword());

  function validateForm() {
    let isValid = true;
    if (!validateFullName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhoneNumber()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    return isValid;
  }

  function validateFullName() {
    const regex = /^[A-Za-z\s]{3,}$/;
    if (!regex.test(fullName.value)) {
      setError(
        fullName,
        "Full Name must contain only alphabets and spaces, and be at least 3 characters long."
      );
      return false;
    } else {
      clearError(fullName);
      return true;
    }
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
      setError(
        email,
        "Email must be in a valid format (e.g., user@example.com)."
      );
      return false;
    } else {
      clearError(email);
      return true;
    }
  }

  function validatePhoneNumber() {
    const regex = /^\d{10}$/;
    if (!regex.test(phoneNumber.value)) {
      setError(phoneNumber, "Phone Number must be a 10-digit number.");
      return false;
    } else {
      clearError(phoneNumber);
      return true;
    }
  }

  function validatePassword() {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password.value)) {
      setError(
        password,
        "Password must be at least 8 characters long and contain a mix of uppercase, lowercase, digits, and special characters."
      );
      return false;
    } else {
      clearError(password);
      return true;
    }
  }

  function validateConfirmPassword() {
    if (confirmPassword.value !== password.value) {
      setError(confirmPassword, "Confirm Password must match the Password.");
      return false;
    } else {
      clearError(confirmPassword);
      return true;
    }
  }

  function setError(element, message) {
    const errorElement = document.getElementById(element.id + "Error");
    element.classList.add("is-invalid");
    errorElement.textContent = message;
  }

  function clearError(element) {
    const errorElement = document.getElementById(element.id + "Error");
    element.classList.remove("is-invalid");
    errorElement.textContent = "";
  }

  function clearValidationMessages() {
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
  }
});
