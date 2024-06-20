let targetDate;
let countdown;
let isPaused = false;
let remainingTime;

function startCountdown() {
  const targetDateTime = document.getElementById("targetDateTime").value;
  console.log(targetDateTime);

  // Parse the input datetime string to a Date object
  targetDate = new Date(targetDateTime).getTime();

  if (isNaN(targetDate)) {
    alert("Invalid date/time. Please enter a valid future date and time.");
    return;
  }

  // Hide the input section and display the countdown section
  document.getElementById("countdown").classList.remove("hidden");
  document.getElementById("message").classList.add("hidden");

  // Start the countdown
  updateTimer();
  countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!isPaused) {
    const now = new Date().getTime();
    remainingTime = targetDate - now;

    if (remainingTime <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").innerHTML =
        "0 days 0 hours 0 minutes 0 seconds";
      document.getElementById("pauseResumeButton").classList.add("hidden");
      document.getElementById("message").classList.remove("hidden");
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
}

function pauseResumeCountdown() {
  if (isPaused) {
    isPaused = false;
    document.getElementById("pauseResumeButton").innerHTML = "Pause";
    countdown = setInterval(updateTimer, 1000);
  } else {
    isPaused = true;
    document.getElementById("pauseResumeButton").innerHTML = "Resume";
    clearInterval(countdown);
  }
}
