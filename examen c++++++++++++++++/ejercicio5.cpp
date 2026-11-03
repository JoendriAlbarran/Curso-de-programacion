#include <iostream>

#define LIMITE 10

int main() {
    int numero;

    std::cout << "ingresa un numero: ";
    std::cin >> numero;

    for (int i = 1; i <= LIMITE; ++i) {
        std::cout << numero << " x " << i << " = " << (numero * i) << std::endl;
    }

    return 0;
}