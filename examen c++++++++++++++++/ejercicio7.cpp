#include <iostream>
float calcularAreaRectangulo(float base, float altura);
int main() {
    float base, altura;
    std::cout << "ingresa la bas del retangulo ";
    std::cin >> base;

    std::cout << "ingresa la altura del rectangulo ";
    std::cin >> altura;
    float area = calcularAreaRectangulo(base, altura);

    std::cout << "el area del rectangulo es " << area << std::endl;

    return 0;
}
float calcularAreaRectangulo(float base, float altura) {
    return base * altura;
}