#include <iostream>
#include <cmath>
int main() {
    double num1, num2;

    std::cout << "añade el primer numero ";
    std::cin >> num1;

    std::cout << "añade el segundo numero ";
    std::cin >> num2;

    std::cout << "\nResultados basicos:" << std::endl;
    std::cout << "suma: " << num1 + num2 << std::endl;
    std::cout << "resta: " << num1 - num2 << std::endl;
    std::cout << "multiplicacion: " << num1 * num2 << std::endl;

    if (num2 != 0) {
        std::cout << "division: " << num1 / num2 << std::endl;
    } else {
        std::cout << "division: No se puede dividir entre cero." << std::endl;
    }

    std::cout << "\nresultados con cmath:" << std::endl;
    std::cout << "potencia (num1 ^ num2): " << std::pow(num1, num2) << std::endl;

    if (num1 >= 0) {
        std::cout << "raiz cuadrada del primer numero: " << std::sqrt(num1) << std::endl;
    } else {
        std::cout << "raiz cuadrada del primer numero: no es posible calcular la raiz de un numero negativo." << std::endl;
    }

    return 0;
}