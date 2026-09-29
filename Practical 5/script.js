let display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

// Keyboard event handling
document.addEventListener("keydown", function(event) {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "."
    ) {
        appendValue(event.key);
    }

    else if (event.key === "Enter") {
        calculate();
    }

    else if (event.key === "Escape") {
        clearDisplay();
    }

    else if (event.key === "Backspace") {
        deleteLast();
    }
});