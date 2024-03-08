function add() {
    return last_result+second_operand;
}

function subtract() {
    return last_result-second_operand;
}

function multiply() {
    return last_result*second_operand;
}

function divide() {
    if(second_operand != 0) {
        return last_result/second_operand;
    }
    return "Undefined";
}


function operate() {
    switch(op) {
        case "+":
            return add();
        case "-":
            return subtract();
        case "*":
            return multiply();
        case "/":
            return divide();
        default:
            return "ERROR";
    }
}

let display_content = "";

let last_result = 0;
let second_operand = undefined;
let op_set = false;
let after_equal = false;

const display = document.querySelector(".calculator-display");

const digits = document.querySelectorAll(".digit");
const op_btns = document.querySelectorAll(".operation");
const clear_btn = document.querySelector(".clear");
const equals_btn = document.querySelector(".equals");

Array.from(digits).forEach(button => button.addEventListener("click", e => {
    let digit = e.target.textContent;
    let current_display = parseFloat(display_content);
    if(after_equal || op_set || isNaN(current_display)) {
        display_content = ""; 
        op_set = false;
        after_equal = false;
    }
    if(current_display != 0) {
        display_content += digit;
    } else {
        display_content = digit;
    }
    second_operand = parseFloat(display_content);
    update_display();
}));

Array.from(op_btns).forEach(button => button.addEventListener("click", e => { 
    if(display_content != "Undefined") {  
        last_result = parseFloat(display_content);
        if(isNaN(last_result)) {
            last_result = 0;
        }
        op = e.target.textContent;
        op_set = true;
    } else {
        op = undefined;
    }
}));


clear_btn.addEventListener("click", e => {
    display_content = "";
    last_result = 0;
    second_operand = undefined;
    op = undefined;
    op_set = false;
    display.textContent = 0;
});

equals_btn.addEventListener("click", e => {
    if(op != undefined && second_operand != undefined) {
        let result = operate();
        if(typeof result === "numeric") {
            last_result = result;
        } else {
            last_result = 0;
        }
        second_operand = undefined;
        display_content = result;
        op_set = false;
        after_equal = true;
        update_display();
    }
})

function update_display() {
    display.textContent = display_content;
}



