let calculator = {
  currentNum: "",
  cache: [],
  display: document.querySelector("#display"),
};

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  handleKeypress(event);
});

document.addEventListener("click", (event) => {
  let target = event.target;
  if (target.nodeName === "BUTTON") {
    handleButtonClick(target);
  }
});

function handleButtonClick(target) {
  if (
    calculator.display.textContent.length > 0 &&
    calculator.currentNum.length === 0 &&
    calculator.cache.length === 0
  ) {
    clearDisplay();
  }

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
  } else if (calculator.currentNum === "0") {
    backspace();
    calculator.currentNum += target.textContent;
    updateDisplay(target.textContent);
  } else {
    calculator.currentNum += target.textContent;
    updateDisplay(target.textContent);
  }
}

function handleKeypress(event) {
  let key = event.key;
  switch (key) {
    case "C":
      key = "#clear";
      break;
    case "Backspace":
      key = "#backspace";
      break;
    case "+":
      key = "#add";
      break;
    case "-":
      key = "#substract";
      break;
    case "*":
      key = "#multiply";
      break;
    case "/":
      key = "#divide";
      break;
    case "=":
      key = "#equals";
      break;
    case ".":
      key = "#comma";
      break;
    default:
      key = "#b" + event.key;
  }

  document.querySelector(key).click();
}

function operate(target) {
  if (target.id === "clear") {
    clear();
  } else if (target.id === "backspace") {
    backspace();
  } else if (target.id === "equals") {
    calculate();
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
    if (divIndex >= 0 && calculator.cache[divIndex + 1] === "0") {
      clear();
      updateDisplay("You can't div by 0");
      return;
    }

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
  clearDisplay();
  updateDisplay(calculator.currentNum);
}

function reduceCache(index1, index2, funct1, funct2) {
  if ((index1 >= 0 && index1 < index2) || (index1 >= 0 && index2 < 0)) {
    result = funct1(
      +calculator.cache[index1 - 1],
      +calculator.cache[index1 + 1],
    );
    result = Math.round(result * 100) / 100;
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

function backspace() {
  if (
    calculator.currentNum.length === 0 &&
    calculator.cache.length !== 0 &&
    isNaN(calculator.cache[calculator.cache.length - 1])
  ) {
    calculator.cache.pop();
    calculator.currentNum = calculator.cache.pop();
    calculator.display.textContent = calculator.display.textContent.slice(
      0,
      -3,
    );
  } else if (calculator.currentNum.length > 0) {
    calculator.currentNum = calculator.currentNum.slice(0, -1);
    calculator.display.textContent = calculator.display.textContent.slice(
      0,
      -1,
    );
  }
}

function clearDisplay() {
  calculator.display.textContent = "";
}

function updateDisplay(input) {
  calculator.display.textContent += input;
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
