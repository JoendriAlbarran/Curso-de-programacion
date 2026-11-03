#include <iostream>
#include <vector>
#include <string>
int main() {
    std::vector<std::string> comidas(3);

    std::cout << "ingresa 3 de tus comidas favorita\n";
    for (int i = 0; i < 3; ++i) {
        std::cout << "comida " << (i + 1) << ": ";
        std::cin >> comidas[i];
    }
    std::cout << "\ntus comidas favoritas son\n";
    for (int i = 0; i < 3; ++i) {
        std::cout << comidas[i] << std::endl;
    }
    return 0;
}