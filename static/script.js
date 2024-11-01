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

  document.getElementById("ageDisplay").style.display = "block";

  if (interval) clearInterval(interval);
  interval = setInterval(async () => {
    const response = await fetch("/calculate_age", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthdate: birthdateInput })
    });

    if (response.ok) {
      const ageData = await response.json();

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
      document.getElementById("heartbeats").textContent = `Approximate Heartbeats: ${ageData.heartbeats}`;
      document.getElementById("breaths").textContent = `Approximate Breaths: ${ageData.breaths}`;

      const historicalEvents = document.getElementById("historicalEvents");
      historicalEvents.innerHTML = "";
      ageData.historical_events.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event;
        historicalEvents.appendChild(li);
      });
    }
  }, 1000);
}

function resetStopwatch() {
  clearInterval(interval);
  document.getElementById("ageDisplay").style.display = "none";

  // Clear age display elements
  document.getElementById("years").textContent = "";
  document.getElementById("months").textContent = "";
  document.getElementById("weeks").textContent = "";
  document.getElementById("days").textContent = "";
  document.getElementById("hours").textContent = "";
  document.getElementById("minutes").textContent = "";
  document.getElementById("seconds").textContent = "";
  document.getElementById("nextBirthday").textContent = "";
  document.getElementById("zodiac").textContent = "";
  document.getElementById("birthstone").textContent = "";

  // Clear fun facts
  document.getElementById("heartbeats").textContent = "";
  document.getElementById("breaths").textContent = "";

  // Clear historical events
  const historicalEvents = document.getElementById("historicalEvents");
  historicalEvents.innerHTML = "";
}


function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
