let result = 0;
let history = [];
let lastOperationLogged = 0;
let inputElement;
let resultInput;
let textArea;
let pressedEqual = false;

function checkIfNumber() {
  const input = inputElement.value;
  if (isNaN(input) || input === "") {
    window.alert("Type a number!");
    return false;
  }
  return true;
}

function setCurrentResult() {
  resultInput.value = result;
}

function clearInput() {
  inputElement.value = "";
}

function logResult() {
  while (lastOperationLogged < history.length) {
    textArea.value += history[lastOperationLogged++];
  }
}

function resetCalculator() {
  result = 0;
  inputElement.value = "";
  history = [];
  lastOperationLogged = 0;
  resultInput.value = "0";
  textArea.value = "";
}

function computeOperation(prevOp, prevNum, num) {
  switch (prevOp) {
    case "+":
      return prevNum + num;
    case "-":
      return prevNum - num;
    case "/":
      return prevNum / num;
    case "*":
      return prevNum * num;
    default:
      console.log("non recognized element");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  textArea = document.querySelector("textarea#logInformation");
  inputElement = document.querySelector("input.inputNumber");
  resultInput = document.querySelector("input#resultValue");
  resultInput.value = 0;
  const resetButton = document.getElementsByClassName("resetButton")[0];
  const equalsButton = document.querySelector("span.equalButton");
  const plusButton = document.querySelector("span#addButton");
  const subtractButton = document.querySelector("span#substractButton");
  const multiplicationButton = document.querySelector(
    "span#multiplicationButton"
  );
  const divisionButton = document.querySelector("span#divisionButton");

  resetButton.addEventListener("click", resetCalculator);

  plusButton.addEventListener("click", e => {
    if (pressedEqual) {
      pressedEqual = false;
      resetCalculator();
    }
    if (checkIfNumber()) {
      const num = inputElement.value;
      const op = "+";
      history.push(num);
      history.push(op);
      clearInput();
    }
  });

  subtractButton.addEventListener("click", e => {
    if (pressedEqual) {
      pressedEqual = false;
      resetCalculator();
    }
    if (checkIfNumber()) {
      const num = inputElement.value;
      const op = "-";
      history.push(num);
      history.push(op);
      clearInput();
    }
  });

  multiplicationButton.addEventListener("click", e => {
    if (pressedEqual) {
      pressedEqual = false;
      resetCalculator();
    }
    if (checkIfNumber()) {
      const num = inputElement.value;
      const op = "*";
      history.push(num);
      history.push(op);
      clearInput();
    }
  });

  divisionButton.addEventListener("click", e => {
    if (pressedEqual) {
      pressedEqual = false;
      resetCalculator();
    }
    if (checkIfNumber()) {
      const num = inputElement.value;
      const op = "/";
      history.push(num);
      history.push(op);
      clearInput();
    }
  });

  equalsButton.addEventListener("click", e => {
    if (checkIfNumber()) {
      const num = inputElement.value;
      history.push(num);
      let nextOp;
      for (let i = 0; i < history.length; i += 2) {
        if (i === 0) {
          const curNum = Number(history[i]);
          nextOp = history[i + 1];
          result = curNum;
        } else if (i == history.length - 1) {
          const curNum = Number(history[i]);
          result = computeOperation(nextOp, result, curNum);
        } else {
          const curNum = Number(history[i]);
          result = computeOperation(nextOp, result, curNum);
          nextOp = history[i + 1];
        }
      }
      history.push("=");
      history.push(result);
      setCurrentResult();
      logResult();
      pressedEqual = true;
    }
  });
});
