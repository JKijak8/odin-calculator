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

function operate(target) {
  if (target.id === "clear") {
    clear();
  } else if (target.id === "equals") {
    newOperation(target);
  } else {
    newOperation(target);
  }
}

function newOperation(target) {
  updateDisplay(` ${target.textContent} `);
  pushToCache(calculator.currentNum);
  pushToCache(target.textContent);
  calculator.currentNum = "";
}

function pushToCache(content) {
  calculator.cache[calculator.cache.length] = content;
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
