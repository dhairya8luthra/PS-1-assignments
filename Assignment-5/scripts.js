function calculateLifespan() {
  // Get the input value (date of birth)
  let dobString = document.getElementById("dobInput").value;

  // Create a Date object from the user input
  let dob = new Date(dobString);

  // Get the current date and time
  let now = new Date();

  // Calculate the difference in milliseconds
  let diffMilliseconds = now - dob;

  // Calculate days, hours, and minutes from milliseconds
  let millisecondsPerDay = 1000 * 60 * 60 * 24;
  let millisecondsPerHour = 1000 * 60 * 60;
  let millisecondsPerMinute = 1000 * 60;

  let days = Math.floor(diffMilliseconds / millisecondsPerDay);
  let hours = Math.floor(
    (diffMilliseconds % millisecondsPerDay) / millisecondsPerHour
  );
  let minutes = Math.floor(
    (diffMilliseconds % millisecondsPerHour) / millisecondsPerMinute
  );

  // Display the result
  let resultElement = document.getElementById("result");
  resultElement.textContent = `You have lived ${days} days, ${hours} hours, and ${minutes} minutes.`;
}
