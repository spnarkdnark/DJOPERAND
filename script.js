let display = [];
let currentValue = '';
let lastValue = '';
let currentOperand = 'n/a';

let dummyDisplay = document.querySelector('#dummy');
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
    if (y === 0) return null;
    return x/y;
}

const operate = function(x,y,operand){
   
    switch(operand){
        case '+': console.log('+'); return addition(x,y);
        break;
        case '-': console.log('-');return subtraction(x,y);
        break;
        case '*': console.log('*');return multiplication(x,y);
        break;
        case '/': return division(x,y);
        break;
        default: return 'null';
    };
}

const parseOperand = function(operand){
    if (operand === 'c'){
        currentValue = '';
        lastValue = '';
    }
    else if (operand === '=' && lastValue){
        currentValue = operate(Number(lastValue), Number(currentValue), currentOperand);
    }
    else{
        lastValue = currentValue;
        currentValue = '';
        currentOperand = operand;
    }
};

const getAllInputListeners = function(){
    document.querySelectorAll('.inputButton').forEach(item => {
        item.addEventListener('click', event =>{
            let inputType = item.id[0];
            let inputValue = item.id[1];
            if (inputType === 'o'){
                parseOperand(inputValue);
                dummyDisplay.textContent = currentValue;

            }
            else if (inputType === 'v'){
                currentValue += inputValue;
            }
            dummyDisplay.textContent = currentValue;
            operand.textContent = currentOperand;

        },true);});
}

getAllInputListeners();