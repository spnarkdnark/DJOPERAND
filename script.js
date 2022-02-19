let display = '';
let storedArray = ['.','.','.','.','.','.','.','.','.','.'];
let currentValue = '';
let storedValue = '';
let currentOperand = 'n/a';
let currentChar = '';
let beatOn = false;
let intervalId;


let currentDisplay = document.querySelector('#current');
let storedDisplay = document.querySelector('#last');
let operandDisplay = document.querySelector('#operand');
let storedArrayDom = document.querySelector('.leftWidgetContainer').children;
let clearButton = document.querySelector('#clear');
let playButton = document.querySelector('#play');
let tempoSlider = document.querySelector('#tempo');
let tempo = Number(600);


const convertTempo = function(value){
    return 60000/value;
}


tempoSlider.addEventListener('input', function(e){
    renderDisplay(currentDisplay, 'tempo: ' + e.target.value);
    renderDisplay(storedDisplay, 'bpm');
    tempo = convertTempo(e.target.value);
});

tempoSlider.addEventListener('change', function(e){
    renderDisplay(currentDisplay, currentValue);
    renderDisplay(storedDisplay, storedValue);
    playBeat();
});

const renderDisplay = function(displayObject, input){
    displayObject.textContent = input;
}

const clearStoredArray = function(){
    storedArray = ['.','.','.','.','.','.','.','.','.','.'];
    for (i = 0; i < storedArray.length; i++){
        storedArrayDom[i].textContent = storedArray[i];
    };
}

const playToggle = function(){
    if (beatOn === true){
        beatOn = false;
        playButton.classList.remove('on');
        return;
    }
    beatOn = true;
    playButton.classList.add('on');
}

const playBeat =function(){
    let intervalIndex = 0;
    clearInterval(intervalId);
    if (beatOn){
       intervalId = setInterval(function(){
           let audio = document.querySelector(`audio[data-key='${storedArray[intervalIndex%storedArray.length]}']`);
           audio.currentTime = 0;
           audio.play()
           intervalIndex += 1;
       },tempo);
   }
   else{
       clearInterval(intervalId);
}};

clearButton.addEventListener('click', clearStoredArray);
playButton.addEventListener('mousedown', playToggle);
playButton.addEventListener('mouseup', playBeat);

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
        case '^': return power(x,y);
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
            storedValue = currentValue;
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

const updateWidget = function(input){
    if (!input) return;
    if (storedArray.length >= 10){
        storedArray.shift();
    }
    storedArray.push(input);
    for (i = 0; i < storedArray.length; i++){
        storedArrayDom[i].textContent = storedArray[i];
    }
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
                    currentValue += inputValue;
                    currentChar = inputValue;
                }
            }
            handleAudio(item);
            updateWidget(inputValue);
            handleAnimation(item);
            currentDisplay.textContent = currentValue;
            storedDisplay.textContent = storedValue;
            operand.textContent = currentOperand;
        },true);});
}

const handleAnimation = function(item){
    if (!item.classList.contains('main')){
        return;
    }
    item.classList.add('playing');
}

const removeTransition = function(e){
    if (e.propertyName !== 'transform'){
        return;
    }
    e.target.classList.remove('playing');
}

const allKeys = Array.from(document.querySelectorAll('.main'));

allKeys.forEach(key => key.addEventListener('transitionend', removeTransition));

getAllInputListeners();