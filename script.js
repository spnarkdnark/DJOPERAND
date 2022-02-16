let display = [];
let currentValue = [];
let lastValue = [];
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

const parseOperand = function(x, y, operand){
    if (operand === 'c'){
        currentValue = [];
    }
    else if (operand === '='){
        operate(x,y,currentOperand);
    }
};

const getAllInputListeners = function(){
    document.querySelectorAll('.inputButton').forEach(item => {
        item.addEventListener('click', event =>{
            let inputType = item.id[0];
            let inputValue = item.id[1];
            if (inputType === 'o'){
                let answer = parseOperand(5,3,inputValue);
                currentOperand = inputValue;
                console.log(answer);
            }
            else if (inputType === 'v'){
                currentValue.push(inputValue);
            }
            dummyDisplay.textContent = currentValue.join('');
            operand.textContent = currentOperand;

        },true);});
}

getAllInputListeners();