const phoneNum = document.getElementById("phone-num");
const display = document.getElementById("display");
const result = document.getElementById("result");

const indicatorEffect = () => {
    const indicator = document.getElementById("indicator");
    indicator.classList.remove("hero__phone-indicator-back");
    indicator.classList.add("hero__phone-indicator-back");

    setTimeout(() => {
        indicator.classList.remove("hero__phone-indicator-back");
    }, 250);
}

let currentInput = "0";
let operation = null;
let nextInput = "";
let shouldReset = false;
let fullExpression = "";

const clearAll = () => {
    currentInput = "0";
    operation = null;
    nextInput = "";
    fullExpression = "";
    display.textContent = "0";
    result.textContent = "0";
    shouldReset = false;
}

const handleNumber = (number) => {
    if (currentInput.length >= 13) return;

    if (currentInput === "0" || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    display.textContent = currentInput;
}

const handleOperation = (op) => {
    if (operation !== null && !shouldReset) {
        calculate(false);
    }
    fullExpression = currentInput + " " + op + " ";
    operation = op;
    nextInput = currentInput;
    shouldReset = true;
    updateDisplay();
}

const calculate = () => {
    let res;
    const prev = parseFloat(nextInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case "+": res = prev + current; break;
        case "-": res = prev - current; break;
        case "X": res = prev * current; break;
        case "÷": res = prev / current; break;
        case "%": res = prev * (current / 100); break;
        case "√": res = Math.sqrt(current); break;
        default: return;
    }

    currentInput = res.toString().slice(0, 13);
    operation = null;
    display.textContent = currentInput;
    result.textContent = currentInput;
    shouldReset = true;
}

const handleDecimal = () => {
    if (currentInput.length >= 13) return;

    if (shouldReset) {
        currentInput = "0.";
        shouldReset = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    display.textContent = currentInput;
}

const updateDisplay = () => {
    if (operation && shouldReset) {
        display.textContent = fullExpression;
    } else {
        display.textContent = currentInput;
    }
}

const displayValues = (button) => {
    const value = button.textContent;

    if (button.classList.contains('btn-number')) {
        handleNumber(value);
    }
    else if (button.classList.contains('btn-purple')) {
        handleOperation(value);
    }
    else if (button.id === 'clear-btn') {
        clearAll();
    }
    else if (value === '=') {
        calculate(true);
    }
    else if (value === '.') {
        handleDecimal();
    }
    else if (value === '√') {
        if (currentInput.length >= 12) return;
        currentInput = Math.sqrt(parseFloat(currentInput)).toString().slice(0, 12);
        display.textContent = currentInput;
    }
}

phoneNum.addEventListener("click", (e) => {
    if (!e.target.classList.contains('hero__phone-btn')) return;

    indicatorEffect();
    displayValues(e.target);
});
