#include <iostream>
void modificarPorValor(int n) {
    n += 10;
}
void modificarPorReferencia(int &n) {
    n += 10;
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