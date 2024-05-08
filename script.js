let calculator = {
  currentNum: "",
  numbers: [],
};

document.addEventListener("click", (event) => {
  let target = event.target;
  if (target.nodeName === "BUTTON") {
    handleButtonClick(target);
  }
});

function handleButtonClick(target) {}
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
