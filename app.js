/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/


document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.querySelector('.display');
    const calculatorElement = document.getElementById('calculator');
    
    let currentValue = '0';
    let currentOperator = null;
    let previousValue = null;

    calculatorElement.addEventListener('click', (event) => {
        const clickedButton = event.target;

        if (clickedButton.classList.contains('number')) {
            const clickedNumber = clickedButton.textContent;
            if (currentValue === '0' || currentOperator) {
                // Start a new operand if currentValue is '0' or an operator was clicked
                currentValue = clickedNumber;
            } else {
                // Append the clicked number to the existing operand
                currentValue += clickedNumber;
            }
            displayElement.textContent = currentValue;
        } else if (clickedButton.classList.contains('operator')) {
            if (currentValue !== '0') {
                // Perform the calculation based on the previous operator
                if (previousValue !== null) {
                    const result = calculate(previousValue, currentOperator, parseFloat(currentValue));
                    currentValue = result.toString();
                    displayElement.textContent = currentValue;
                } else {
                    // Store the current value as the previous value
                    previousValue = parseFloat(currentValue);
                }
            }
            // Store the clicked operator
            currentOperator = clickedButton.textContent;
        } else if (clickedButton.classList.contains('equals')) {
            if (currentValue !== '0' && currentOperator) {
                // Calculate the result when "=" is clicked
                const result = calculate(previousValue, currentOperator, parseFloat(currentValue));
                currentValue = result.toString();
                displayElement.textContent = currentValue;
                // Reset operator and previous value
                currentOperator = null;
                previousValue = null;
            }
        } else if (clickedButton.classList.contains('clear')) {
            // Clear the calculator completely
            currentValue = '0';
            currentOperator = null;
            previousValue = null;
            displayElement.textContent = currentValue;
        }
    });

    function calculate(a, operator, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b; 
        }
    }
});

//used 2 different approaches. This one provides a calculator that doesn't function properly, the other i setup AI to walk me through a course and ultimately completely failed (below).

document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('display');
    let currentValue = '0';
    let currentOperator = null;
    let previousValue = null;

    function appendToDisplay(number) {
        if (currentValue === '0' || currentOperator) {
            currentValue = number;
        } else {
            currentValue += number;
        }
        displayElement.textContent = currentValue;
    }

    function setOperator(operator) {
        currentOperator = operator;
        previousValue = parseFloat(currentValue);
        currentValue = '0';
    }

    function calculate() {
        if (currentOperator && previousValue !== null) {
            const num2 = parseFloat(currentValue);
            switch (currentOperator) {
                case '+':
                    currentValue = (previousValue + num2).toString();
                    break;
                case '-':
                    currentValue = (previousValue - num2).toString();
                    break;
                case '*':
                    currentValue = (previousValue * num2).toString();
                    break;
                case '/':
                    currentValue = (num2 !== 0) ? (previousValue / num2).toString() : 'Error';
                    break;
                default:
                    break;
            }
            displayElement.textContent = currentValue;
            currentOperator = null;
            previousValue = null;
        }
    }

    function clearDisplay() {
        currentValue = '0';
        currentOperator = null;
        previousValue = null;
        displayElement.textContent = currentValue;
    }

    // Attach event listeners to buttons (adjust IDs as needed)
    document.getElementById('button-7').addEventListener('click', () => appendToDisplay('7'));
    document.getElementById('button-8').addEventListener('click', () => appendToDisplay('8'));
    // Add other number buttons (1-9) similarly
    document.getElementById('button-plus').addEventListener('click', () => setOperator('+'));
    document.getElementById('button-minus').addEventListener('click', () => setOperator('-'));
    // Add other operator buttons (*, /) similarly
    document.getElementById('button-equals').addEventListener('click', calculate);
    document.getElementById('button-clear').addEventListener('click', clearDisplay);
});


