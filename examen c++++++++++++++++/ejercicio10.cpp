#include <iostream>
void calcularPerimetro(double radio) {
    const double PI = 3.14159;
    double perimetro = 2 * PI * radio;
    std::cout << "el perimetro del circulo es" << perimetro <<std::endl;
}
int main() {
    double radio;

    std::cout << "ingresaa el radio del circulo";
    std::cin >> radio;

    calcularPerimetro(radio);

    return 0
}