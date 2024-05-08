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

function handleButtonClick(target) {
  if (target.classList.contains("operation")) {
    operate(target);
  } else {
    calculator.currentNum += target.textContent;
    updateDisplay(target.textContent);
  }
}

function operate(target) {
  if (target.id === "clear") {
  } else if (target.id === "equals") {
  } else {
    newOperation(target);
  }
}

function newOperation(target) {
  updateDisplay(` ${target.textContent} `);
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
