let display = [];
let currentValue = '';
let storedValue = '';
let currentOperand = 'n/a';
let currentChar = '';


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

const modulo = function(x,y){
    return x%y;
}

const power = function(x,y){
    return x**y;
}

const operate = function(x,y,operand){
    if (operand === 'c') return;
    
    switch(operand){
        case '+': return addition(x,y);
        break;
        case '-': return subtraction(x,y);
        break;
        case '*': return multiplication(x,y);
        break;
        case '/': return division(x,y);
        break;
        case '%': return modulo(x,y);
        break;
        case '**': return power(x,y);
        default: return 'null';
    };
}

const parseOperand = function(operand){
    if (operand === 'c'){
        resetValues();
        return;
    }
    else if (operand === '='){
        if (currentOperand === '=' || currentOperand === 'n/a'){
            return;
        }
        storedValue = operate(Number(storedValue), Number(currentValue), currentOperand);
    }

    else if (storedValue && currentValue){
        storedValue = operate(Number(storedValue), Number(currentValue), currentOperand);
    }

    else if (storedValue){
        return;
    }

    else{
        storedValue = currentValue;
    }
   
};

const resetValues = function(){
    currentValue = '';
    storedValue = '';
    currentOperand = '';
}

const handleAudio = function(item){
    let audio = document.querySelector(`audio[data-key='${item.dataset.key}']`)
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

const validateInput = function(input){
    if (currentValue.length >= 8){
        errorText = 'overflow error!';
        return false;
    }
    if (input === '.' && currentChar === '.'){
        errorText = 'too many decimals!'
        return false;
    }
    if (input === '.' && currentValue.includes('.')){
        return false;
    }
    else return true;
}

const getAllInputListeners = function(){
    document.querySelectorAll('.inputButton').forEach(item => {
        item.addEventListener('click', event =>{
            let inputType = item.id[0];
            let inputValue = item.id[1];
            if (inputType === 'o'){
                parseOperand(inputValue);
                currentValue = '';
                currentOperand = inputValue;
            }
            else if (inputType === 'v'){
                if (currentOperand === '='){
                    storedValue = '';
                }
                if (validateInput(inputValue)){
                    console.log('hello');
                    currentValue += inputValue;
                    currentChar = inputValue;
                }
            }
            handleAudio(item);
            currentDisplay.textContent = currentValue;
            lastDisplay.textContent = storedValue;
            operand.textContent = currentOperand;
            

        },true);});
}

getAllInputListeners();