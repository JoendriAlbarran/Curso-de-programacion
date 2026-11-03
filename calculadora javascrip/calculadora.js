
function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Error: No se puede dividir entre cero";
    }
    return a / b;
}

function potenciar(base, exponente) {
    return base ** exponente; 
}

function modulo(a, b) {
    if (b === 0) {
        return "Error: No se puede calcular módulo con divisor cero";
    }
    return a % b;
}


let num1 = 10;
let num2 = 3;

console.log("=== CALCULADORA EN JAVASCRIPT ===");
console.log(`Valores: a = ${num1}, b = ${num2}\n`);

console.log(`Suma (${num1} + ${num2}):`, sumar(num1, num2));
console.log(`Resta (${num1} - ${num2}):`, restar(num1, num2));
console.log(`Multiplicación (${num1} * ${num2}):`, multiplicar(num1, num2));
console.log(`División (${num1} / ${num2}):`, dividir(num1, num2));
console.log(`Potencia (${num1} ^ ${num2}):`, potenciar(num1, num2));
console.log(`Módulo (${num1} % ${num2}):`, modulo(num1, num2));