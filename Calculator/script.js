const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

function updateDisplay(value) {
    display.textContent = value || "0";
}

function calculate() {
    try {
        const result = eval(
            currentInput
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/−/g, "-")
        );
        currentInput = result.toString();
        updateDisplay(currentInput);
    } catch {
        updateDisplay("Error");
        currentInput = "";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            updateDisplay("");
        } 
        else if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } 
        else if (value === "=") {
            calculate();
        } 
        else {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

document.addEventListener("keydown", (e) => {
    const keyMap = {
        "*": "×",
        "/": "÷",
        "-": "−",
        "+": "+"
    };

    if (!isNaN(e.key) || e.key === ".") {
        currentInput += e.key;
    }
    else if (keyMap[e.key]) {
        currentInput += keyMap[e.key];
    }
    else if (e.key === "Enter") {
        calculate();
    }
    else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    }
    else if (e.key.toLowerCase() === "c") {
        currentInput = "";
    }

    updateDisplay(currentInput);
});
