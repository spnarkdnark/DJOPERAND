let display = [];
let currentValue = '';
let storedValue = '';
let currentOperand = 'n/a';

let currentDisplay = document.querySelector('#current');
let lastDisplay = document.querySelector('#last');
let operandDisplay = document.querySelector('#operand');

const addition = function(x, y){
    return x+y;
}

const subtraction = function(x, y){
    return x-y;
}

const multiplication = function(x,y){
    return x*y;
}

const division = function(x,y){
    if (y === 0) return 'BROKE';
    return x/y;
}

const operate = function(x,y,operand){
   
    switch(operand){
        case '+': return addition(x,y);
        break;
        case '-': return subtraction(x,y);
        break;
        case '*': return multiplication(x,y);
        break;
        case '/': return division(x,y);
        break;
        default: return 'null';
    };
}

const parseOperand = function(operand){
    if (operand === 'c'){
        resetValues();
        currentOperand = operand;
        return;
    }

    else if (operand === '='){
        storedValue = operate(Number(storedValue), Number(currentValue), currentOperand);
        currentValue = '';
    }

    else if (storedValue && currentValue){
        storedValue = operate(Number(storedValue), Number(currentValue), currentOperand);
        currentValue = '';
    }

    else if (storedValue){
        currentOperand = operand;
        return;
    }

    else{
        storedValue = currentValue;
        currentValue = '';
    }
    currentOperand = operand;
   
};

const resetValues = function(){
    currentValue = '';
    storedValue = '';
}

const getAllInputListeners = function(){
    document.querySelectorAll('.inputButton').forEach(item => {
        item.addEventListener('click', event =>{
            let inputType = item.id[0];
            let inputValue = item.id[1];
            if (inputType === 'o'){
                parseOperand(inputValue);
            }
            else if (inputType === 'v'){
                currentValue += inputValue;
            }
            currentDisplay.textContent = currentValue;
            lastDisplay.textContent = storedValue;
            operand.textContent = currentOperand;

        },true);});
}

getAllInputListeners();