let calculator = {
  currentNum: "",
  numbers: [],
};

function updateDisplay(input) {
  const display = document.querySelector("#display");
  display.textContent += input;
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
