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
  } else if (target.id === "comma") {
    if (
      calculator.currentNum.length !== 0 &&
      !calculator.currentNum.includes(".")
    ) {
      calculator.currentNum += target.textContent;
      updateDisplay(target.textContent);
    }
  } else {
    calculator.currentNum += target.textContent;
    updateDisplay(target.textContent);
  }
}

function operate(target) {
  if (target.id === "clear") {
    clear();
  } else if (target.id === "equals") {
    calculate();
    clearDisplay();
    updateDisplay(calculator.currentNum);
  } else {
    newOperation(target);
  }
}

function newOperation(target) {
  if (calculator.currentNum.length !== 0) {
    updateDisplay(` ${target.textContent} `);
    calculator.cache.push(calculator.currentNum);
    calculator.cache.push(target.textContent);
    calculator.currentNum = "";
  }
}

function calculate() {
  calculator.cache.push(calculator.currentNum);
  calculator.currentNum = "";

  let multIndex = calculator.cache.indexOf("*");
  let divIndex = calculator.cache.indexOf("/");

  while (multIndex >= 0 || divIndex >= 0) {
    reduceCache(multIndex, divIndex, multiply, divide);
    multIndex = calculator.cache.indexOf("*");
    divIndex = calculator.cache.indexOf("/");
  }

  let addIndex = calculator.cache.indexOf("+");
  let subIndex = calculator.cache.indexOf("-");

  while (addIndex >= 0 || subIndex >= 0) {
    reduceCache(addIndex, subIndex, add, substract);
    addIndex = calculator.cache.indexOf("+");
    subIndex = calculator.cache.indexOf("-");
  }

  calculator.currentNum = `${calculator.cache[0]}`;
  calculator.cache.splice(0, 1);
}

function reduceCache(index1, index2, funct1, funct2) {
  if ((index1 >= 0 && index1 < index2) || (index1 >= 0 && index2 < 0)) {
    result = funct1(
      +calculator.cache[index1 - 1],
      +calculator.cache[index1 + 1],
    );
    calculator.cache.splice(index1 - 1, 3, result);
  }
  if ((index2 >= 0 && index2 < index1) || (index2 >= 0 && index1 < 0)) {
    result = funct2(
      +calculator.cache[index2 - 1],
      +calculator.cache[index2 + 1],
    );
    calculator.cache.splice(index2 - 1, 3, result);
  }
}

function clear() {
  calculator.cache = [];
  calculator.currentNum = [];
  clearDisplay();
}

function clearDisplay() {
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
