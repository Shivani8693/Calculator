
class Calculator {

    constructor(previousinput, currentinput) {
        this.previousinput = previousinput
        this.currentinput = currentinput
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number == "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectoperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let calculate
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                calculate = prev + curr
                // console.log(calculate)
                break;
            case '-':
                calculate = prev - curr
                break;
            case 'x':
                console.log(prev)
                console.log(curr)
                // prev=curr
                // calculate=0
                calculate=prev*curr
                console.log(prev)
                console.log(curr)
                break;
            case '÷':
                calculate = prev / curr
                break;
            case '^':
                calculate=prev
                for (let i = 1; i < curr; --curr){
                    calculate=prev*calculate
                }
                break;
            case '√':
                console.log(curr)
                calculate=Math.sqrt(curr)
                console.log(Math.sqrt(prev))
                break;
            default:
                alert('please select an operator')
                return
        }

        this.currentOperand = calculate
        this.operation = undefined
        this.previousOperand = ''
    }

    getdisplay(number) {
        const stringNumber = number.toString()
        const intergerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let intergerDisplay 

        if(isNaN(intergerNumber)){
            intergerDisplay = ''
        }else {
            intergerDisplay = intergerNumber.toLocaleString("en",{maximumfractionDigits:0})
        }
        if(decimalNumber!=null){
            return`${intergerDisplay}.${decimalNumber}`
        }
        else{
            return intergerDisplay
        }
}

show() {
    this.currentinput.innerText = this.getdisplay(this.currentOperand)
    if (this.operation != null) {
        // this.operation ==="^" ||
        if( this.operation ==='√'){
            // this.previousinput.innerText = `${this.previousOperand}`
            this.previousinput.innerText = `${this.operation} ${this.previousOperand}`
        }else{
            // this.previousinput.innerText = `${this.previousOperand}`
            this.previousinput.innerText = `${this.previousOperand} ${this.operation}`
        }
    }else{
        this.previousinput.innerText=''
    }
}
}

const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[equalto]')
const allclearbutton = document.querySelector('[btn-clear]')
const deleteButton = document.querySelector('[btn-delete]')
const previousinput = document.querySelector('[previous]')
const currentinput = document.querySelector('[current]')
const calculator = new Calculator(previousinput, currentinput)

numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.show()
    })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectoperation(button.innerText)
        calculator.show()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.show()
})

allclearbutton.addEventListener('click', button => {
    calculator.clear()
    calculator.show()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.show()
})