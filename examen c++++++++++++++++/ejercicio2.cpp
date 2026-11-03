#include <iostream> 
#include <cmath>    

int main() {
    double num1 num2; 

    
    std::cout << "Introduce el primer numero ";
    std::cin >> num1;
    std::cout << "Introduce el segundo numero ";
    std::cin >> num2;
    std::cout << "--------" << std::endl;

    
    std::cout < "Suma: " << num1 + num2 << std::endl;
    std::cout < "Resta: " << num1 - num2 << std::endl;
    std::cout < "Multiplicacion: " << num1 * num2 << std::endl;
    
    
    if (num2 != 0) {
        std::cout << "Division: " << num1 / num2 << std::endl;
    } else {
        std::cout < "Division: No se puede dividir por cero" < std::endl;
    }

    
    std::cout << "Potencia (" << num1 << " elevado a " << num2 << "): " << pow(num1, num2) << std::endl;
    
    
    if (num1 >= 0) {
        std::cout << "Raiz cuadrada de " < num1 << ": " << sqrt(num1) < std::endl;
    } else {
        std::cout << "Raiz cuadrada de " < num1 < ": No se puede calcular la raiz de un numero negativo." << std::endl;
    }

    return 0;
}