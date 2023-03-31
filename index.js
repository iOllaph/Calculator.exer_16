/*For this project the use of class is useful because of the functions and information it has to store.
Class declarations are not hoisted like function declarations. 
During the creation phase, the JavaScript engine moves the variable and function declarations to the top of your code. This is known as hoisting in JavaScript.
Means the class must go to the top, to javascript read.*/

class Calculator {



    // With the constructor, we will call the outside const inside the class
    constructor (previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
    };
    


    appendOperation(operation) {
        if(this.currentOperand === "" ) return;

        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation;

        this.previousOperand = this.currentOperand;

        this.currentOperand = "";


    }


    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }



    allClear() {
        this.previousOperand = "";

        this.currentOperand = "";
        
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }



    // Actual calculations
    // isNaN means "is not a Nummber"
    // This symbol || inside the if means "or"
    compute() {
        let computation

        const prev = parseFloat(this.previousOperand);
        
        const current = parseFloat(this.currentOperand);
        
        if(isNaN(prev) || isNaN(current) ) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break    
            case 'x':
                computation = prev * current;
                break 
            case '÷':
                computation = prev / current;
                break
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }



    udpateCalculator() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation} `
        }
    }
}



// const assignment to data
const buttonNumber = document.querySelectorAll("[data-number]");
const buttonOperation = document.querySelectorAll("[data-operation]");
const buttonEqual = document.querySelector("[data-equal]");
const buttonAllClear = document.querySelector("[data-allclear]");
const buttonDelete = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");



const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)



buttonNumber.forEach(button =>{
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.udpateCalculator();
    })
})



buttonEqual.addEventListener("click", () =>{
    debugger
    calculator.compute();
    calculator.udpateCalculator();
})



buttonOperation.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendOperation(button.innerText);
        calculator.udpateCalculator();
    })
})



buttonAllClear.addEventListener("click", () => {
    calculator.allClear();
    calculator.udpateCalculator();
})



buttonDelete.addEventListener("click", () => {
    calculator.delete();
    calculator.udpateCalculator();
})
