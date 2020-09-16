let runningTotal = 0;
let buffer = "0";
let previousOpperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    screen.innerText = buffer
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0"
            runningTotal = "0"
            break;
        case "←":
            if (buffer !== "0"){
                if (buffer.length > 1){
                    buffer = buffer.slice(0, -1);
                } else {
                    buffer = "0"
                }
            }
            break
        case "÷":
            previousOpperator = "/"
            runningTotal = buffer
            buffer = "0"
            break
        case "×":
            previousOpperator = "*"
            runningTotal = buffer
            buffer = "0"
            break
        case "-":
            previousOpperator = "-"
            runningTotal = buffer
            buffer = "0"
            break
        case "+":
            previousOpperator = "+"
            runningTotal = buffer
            buffer = "0"
            break
        case "=":
            if (buffer && previousOpperator && runningTotal){
                buffer = eval(runningTotal + previousOpperator + buffer).toFixed(0);
                runningTotal = "0";
                previousOpperator = null;
            }
            break
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init()
