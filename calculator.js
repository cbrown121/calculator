function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operater, num1, num2) {
    switch (operater) {
        case add:
            return add(num1, num2);
        case subtract:
            return subtract(num1, num2);
        case multiply:
            return multiply(num1, num2);
        case divide:
            return divide(num1, num2);

        default:
            return "invalid";
    }
}

// Need to store the numbers in the display
// First need to reference the selected buttons

// button is selected
// that button is added to the display
const container = document.getElementById("container");
const display = document.querySelector(".display");


let calValue1 = 0;
let calValue2 = 0;
let operation = '';
let justEvaluated = false;
let waitingForSecondNumber = false;

document.addEventListener("keydown", (event) => {
    const value = event.key;

    if (value === "Backspace" && display.textContent !== "0") {
        display.textContent = display.textContent.slice(0, -1);
    
        // If nothing left, show "0"
        if (display.textContent === "") {
            display.textContent = "0";
        }
    }
    

    // Prevent invalid "=" usage
    if (value === "=" && !operation) return;

    // Clear display on Escape or Backspace
    if (value === "Escape" || value === "c") {
        display.textContent = "0";
        calValue1 = 0;
        calValue2 = 0;
        operation = '';
        justEvaluated = false;
        waitingForSecondNumber = false;
        return;
    }

    // Prevent duplicate decimals
    if (value === "." && display.textContent.includes(".")) return;

    // Handle operations
    if (["+", "-", "*", "/"].includes(value)) {
        calValue1 = parseFloat(display.textContent);
        operation = getOperationFunction(value === "*" ? "X" : value);
        waitingForSecondNumber = true;
        return;
    }

    // Handle equals
    if (value === "Enter" || value === "=") {
        calValue2 = parseFloat(display.textContent);
        display.textContent = operate(operation, calValue1, calValue2);
        justEvaluated = true;
        return;
    }

    // Allow only digits and decimal
    if (!/[\d.]/.test(value)) return;

    // Handle number/decimal input
    if (justEvaluated) {
        display.textContent = value;
        justEvaluated = false;
    } else if (waitingForSecondNumber) {
        display.textContent = value;
        waitingForSecondNumber = false;
    } else if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }

    console.log("Value 1:", calValue1);
    console.log("Operation:", operation);
    console.log("Value 2:", calValue2);
});


container.addEventListener('click', (event) => {

    const value = event.target.textContent;
    const id = event.target.id;

    if (value === "Backspace" && display.textContent !== "0") {
        display.textContent = display.textContent.slice(0, -1);
    
        // If nothing left, show "0"
        if (display.textContent === "") {
            display.textContent = "0";
        }
        return;
    }

    if (value === "=" && (!operation)) {
        return;
    }

    // Clear display
    if (value === "C") {
        display.textContent = "0";
        return;
    }

    // Prevent duplicate decimals
    if (value === "." && display.textContent.includes(".")) {
        return;
    }

    // Replace initial 0 with number
    if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
        return;
    }

    // Handle operations
    if (["+", "-", "X", "/"].includes(id)) {
        calValue1 = parseFloat(display.textContent);
        operation = getOperationFunction(id);
        waitingForSecondNumber = true;
        return;
    }

    // Handle equals
    if (id === "=") {
        calValue2 = parseFloat(display.textContent);
        display.textContent = operate(operation, calValue1, calValue2);
        justEvaluated = true;
        return;
    }

    // Handle number/decimal input
    if (justEvaluated) {
        display.textContent = value;
        justEvaluated = false;
    } else if (waitingForSecondNumber === true) {  
        display.textContent = value;
        waitingForSecondNumber = false;
    } else if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }

    console.log("Value 1:", calValue1);
    console.log("Operation:", operation);
    console.log("Value 2:", calValue2);
});

// Helper: Returns appropriate operation function
function getOperationFunction(op) {
    switch (op) {
        case "+": return add;
        case "-": return subtract;
        case "X": return multiply;
        case "/": return divide;
        default: return () => 0;
    }
}
