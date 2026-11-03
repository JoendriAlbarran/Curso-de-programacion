#include <iostream>

const double PI = 3.14159;

void calcularPerimetro(double radio) {
    double perimetro = 2 * PI * radio;
    std::cout << "el perimetro del  " << perimetro << std::endl;
}

int main() {
    double radioUsuario;

    std::cout << "Ingresa el radio ";
    std::cin >> radioUsuario;

    calcularPerimetro(radioUsuario);

    return 0;
}