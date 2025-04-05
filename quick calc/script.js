class Calculator {
    constructor(previousNum, currentNum) {
        this.previousNum = previousNum;
        this.currentNum = currentNum;
        this.clear();
    }

    clear() {
        this.currentOperand = ' '
        this.previousOperand = ' '
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === ' ') return
        if (this.currentOperand !== ' ') {
            this.compute()
        }
        this.operation  = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ' '
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ' '
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ' '
        } else {
            integerDisplay = integerDigits .toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentNum.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousNum.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousNum.innerText = ' '
        }
    }
};

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const equalsBtn = document.querySelector('[data-equals]');
const previousNum = document.querySelector('[data-previous-num]');
const currentNum = document.querySelector('[data-current-num]');

const calculator  = new Calculator(previousNum, currentNum);

numberBtn.forEach(div =>  {
    div.addEventListener('click', () => {
        calculator.appendNumber(div.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(div =>  {
    div.addEventListener('click', () => {
        calculator.chooseOperation(div.innerText)
        calculator.updateDisplay()
    })
}) 

equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
}) 

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})     

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})  