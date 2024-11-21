let Calculation = localStorage.getItem("Calculation") || "0";
displayCalculation();

function calculateNumber(value) {
  const maxInputLength = 13; // Set the maximum input length

  if (Calculation.length >= maxInputLength) {
    alert("Maximum input length reached!"); // Notify the user
    return; // Prevent further input
  }
  if (Calculation === "0") {
    Calculation = value;
  } else {
    Calculation += value;
  }
  displayCalculation();
  localStorage.setItem("Calculation", Calculation);
}

function calculateResult() {
  try {
    Calculation = eval(Calculation);
    if (typeof Calculation === "number" && Calculation.toString().includes(".")) {
      Calculation = parseFloat(Calculation.toFixed(5));
    }
    displayCalculation();
    localStorage.setItem("Calculation", Calculation);
  } catch {
    Calculation = "Error";
    displayCalculation();
  }
}

function clearCalculation() {
  Calculation = "0";
  displayCalculation();
  localStorage.setItem("Calculation", Calculation);
}

function displayCalculation() {
  document.querySelector(".js-result").innerHTML = Calculation;
}



// Add Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    // If the key is a number
    calculateNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    // If the key is an operator
    calculateNumber(key);
  } else if (key === "Enter") {
    // If the Enter key is pressed
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    // Remove the last character
    Calculation = Calculation.slice(0, -1) || "0";
    displayCalculation();
    localStorage.setItem("Calculation", Calculation);
  } else if (key === "Escape") {
    // Clear calculation on Escape key
    clearCalculation();
  }
});
