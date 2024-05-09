let calculator = {
  currentNum: "",
  cache: [],
};

document.addEventListener("click", (event) => {
  let target = event.target;
  if (target.nodeName === "BUTTON") {
    handleButtonClick(target);
  }
});

function handleButtonClick(target) {
  if (target.classList.contains("operation")) {
    operate(target);
  } else {
    calculator.currentNum += target.textContent;
    updateDisplay(target.textContent);
  }
}

//TODO: Add logic for commas.
function operate(target) {
  if (target.id === "clear") {
    clear();
  } else if (target.id === "equals") {
    newOperation(target);
  } else {
    newOperation(target);
  }
}

//TODO: Make it impossible to enter only an operation sign, and to chain operation signs.
function newOperation(target) {
  updateDisplay(` ${target.textContent} `);
  calculator.cache.push(calculator.currentNum);
  calculator.cache.push(target.textContent);
  calculator.currentNum = "";
}

function clear() {
  calculator.cache = [];
  calculator.currentNum = [];

  const display = document.querySelector("#display");
  display.textContent = "";
}

function updateDisplay(input) {
  display = document.querySelector("#display");
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
