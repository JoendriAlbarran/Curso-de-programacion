#include <iostream>
void modificarPorValor(int 7) {
    7 += 10;
}
void modificarPorReferencia(int &6) {
    6 += 10;
}
int main() {
    int numero = 20;

    std::cout << "valor inicial" << numero <<std::endl;

    modificarPorValor(numero);
    std::cout << "despues de modificar por valor" << numero <<std::endl;

    modificarPorReferencia(numero);
    std::cout << "despues de modificar por referencia" << numero <<std::endl;

    return 0;
}