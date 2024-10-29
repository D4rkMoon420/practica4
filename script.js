let currentInput = '';
let operation = undefined;
let previousInput = '';
let ans = 0;
let isComputed = false; // Nueva variable para controlar el reinicio del display

function appendNumber(number) {
    // Si el último cálculo fue realizado, limpiar antes de agregar un número nuevo
    if (isComputed) {
        currentInput = '';
        isComputed = false;
    }
    currentInput += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result;
    ans = result;
    operation = undefined;
    previousInput = '';
    updateDisplay();
    isComputed = true; // Indica que se ha realizado un cálculo
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
    isComputed = false; // Reinicia el estado de cálculo
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = currentInput || '0';
}

function useAns() {
    if (isComputed) {
        currentInput = '';
        isComputed = false;
    }
    currentInput = ans.toString();
    updateDisplay();
}

// Función para manejar las teclas del teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Números
    if (!isNaN(key)) appendNumber(key);
    
    // Operadores
    if (key === '+') chooseOperation('+');
    if (key === '-') chooseOperation('-');
    if (key === '*') chooseOperation('*');
    if (key === '/') chooseOperation('/');
    
    // Funciones especiales
    if (key === 'Enter') compute(); // Enter para "="
    if (key === 'Escape') clearDisplay(); // Escape para "C"
    if (key.toLowerCase() === 'a') useAns(); // Tecla "A" para "Ans"
});
