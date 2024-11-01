let interval;

function autoFormatDate(input) {
  let value = input.value;
  if (value.length === 2 || value.length === 5) {
    input.value += '/';
  }
}

async function startStopwatch() {
  const birthdateInput = document.getElementById("birthdate").value;
  const response = await fetch("/calculate_age", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ birthdate: birthdateInput })
  });

  if (!response.ok) {
    alert("Please enter a valid date in DD/MM/YYYY format");
    return;
  }

  // Display the age section
  document.getElementById("ageDisplay").style.display = "block";

  // Start real-time updates
  if (interval) clearInterval(interval);
  interval = setInterval(async () => {
    const response = await fetch("/calculate_age", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthdate: birthdateInput })
    });

    if (response.ok) {
      const ageData = await response.json();

      // Update the displayed values
      document.getElementById("years").textContent = `${ageData.years} Years`;
      document.getElementById("months").textContent = `${ageData.months} Months`;
      document.getElementById("weeks").textContent = `${ageData.weeks} Weeks`;
      document.getElementById("days").textContent = `${ageData.days} Days`;
      document.getElementById("hours").textContent = `${ageData.hours} Hours`;
      document.getElementById("minutes").textContent = `${ageData.minutes} Minutes`;
      document.getElementById("seconds").textContent = `${ageData.seconds} Seconds`;
      document.getElementById("nextBirthday").textContent = `${ageData.days_until_birthday} Days until next birthday`;
      document.getElementById("zodiac").textContent = `Zodiac: ${ageData.zodiac}`;
      document.getElementById("birthstone").textContent = `Birthstone: ${ageData.birthstone}`;
    }
  }, 1000);
}

function resetStopwatch() {
  clearInterval(interval);
  document.getElementById("ageDisplay").style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
