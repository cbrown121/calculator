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


container.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    if (event.target.textContent === "C") { // if the user is selecting the clear button, replace everything with a 0
        display.textContent = "0";
    } else if ((display.textContent === "0") && (event.target.id != ".")) { // if the display starts with a 0 and the next button is not a decimal, replace the 0
        display.textContent = event.target.textContent;
    } else if ((display.textContent.includes(".")) && (event.target.id === ".")) { //if the display already contains a decimal
        // don't add to the display 
        return;
    } else {
        display.textContent += event.target.textContent; // append the next number to the current number
    }
    console.dir(event.target.id);
});
