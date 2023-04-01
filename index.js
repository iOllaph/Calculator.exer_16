/*For this project the use of class is useful because of the functions and information it has to store.
Class declarations are not hoisted like function declarations. 
During the creation phase, the JavaScript engine moves the variable and function declarations to the top of your code. This is known as hoisting in JavaScript.
Means the class must go to the top, to javascript read.*/

class Calculator {



    /* This constructor function is used to create a new Calculator object with two properties: 
    previousOperandTextElement and currentOperandTextElement, which store references 
    to HTML elements that will display the previous and current operand values in the calculator.  */
    // The "allClear()" is also called to initialize these properties to empty values.
    
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



    // Is converting to string, to add numbers to use in the operations
    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }



    allClear() {
        this.previousOperand = "";

        this.currentOperand = "";
        
        this.operation = undefined;

    }

    

    // Must converto to string to delete the last number

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }



    // Actual calculations
    // isNaN means "is not a Nummber"
    // This symbol || inside the if means "or"
    // Must use "parseFloat" to convert the string numbers in to number. So javascript can use in the operations

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


    /* The ${} syntax within the template literal is used to inject variables or expressions into the string.
    So, in this case, the string "${this.previousOperand} ${this.operation} " is constructed by combining the value of this.previousOperand, a space, and the value of this.operation.
    For example, if this.previousOperand is 5 and this.operation is '+', the resulting string would be "5 + ". --TEACHER GPT-- */ 

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


// to assing a class to a const, must use "new"

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)



// Event Listeners 

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
