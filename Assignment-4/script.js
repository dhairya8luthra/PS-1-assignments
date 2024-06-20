// Initialize array to store emails
let emailList = [];

// Function to check if email is already in the list
function isEmailInList(email) {
  return emailList.includes(email);
}

// Function to add email to the list and update display
function addEmailToList(email) {
  emailList.push(email);
  updateEmailsDisplay();
  saveEmailsToLocalStorage();
}

// Function to update the displayed emails
function updateEmailsDisplay() {
  const emailsUl = document.getElementById("emails");
  emailsUl.innerHTML = "";
  emailList.forEach((email) => {
    const li = document.createElement("li");
    li.textContent = email;
    emailsUl.appendChild(li);
  });
}

// Function to save emails to local storage
function saveEmailsToLocalStorage() {
  localStorage.setItem("emailList", JSON.stringify(emailList));
}

// Function to load emails from local storage
function loadEmailsFromLocalStorage() {
  const storedEmails = JSON.parse(localStorage.getItem("emailList"));
  if (storedEmails) {
    emailList = storedEmails;
    updateEmailsDisplay();
  }
}

// Add event listener to form for adding emails
const form = document.getElementById("emailForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  if (email === "") {
    alert("Please enter an email.");
    return;
  }

  if (isEmailInList(email)) {
    alert("This email is already in the list.");
    return;
  }

  addEmailToList(email);
  emailInput.value = "";
});

// Add event listener to button for displaying emails
const showEmailsBtn = document.getElementById("showEmailsBtn");
showEmailsBtn.addEventListener("click", function () {
  updateEmailsDisplay();
});

// On page load, load emails from local storage
document.addEventListener("DOMContentLoaded", function () {
  loadEmailsFromLocalStorage();
});
