#include <iostream>

int main() {
    int numeroSecreto = 42;
    int intento = 0;

    std::cout << "adivina el numero secreto" << std::endl;

    while (intento != numeroSecreto) {
        std::cout << "ingresa tu numero: ";
        std::cin >> intento;

        if (intento > numeroSecreto) {
            std::cout << "mas bajo" << std::endl;
        } else if (intento < numeroSecreto) {
            std::cout << "mas alto" << std::endl;
        } else {
            std::cout << "felicidadesss Adivinaste el numero" << std::endl;
        }
    }

    return 0;
}