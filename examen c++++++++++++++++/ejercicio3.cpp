#include <iostream>

int main() {
    int edad;

    
    std::cout << "pon tu edad ";
    std::cin >> edad;

    
    if (edad >= 18) {
        std::cout << "eres mayor de edad" << std::endl;
    } else {
        std::cout << "eres menor de edad" << std::endl;
    }

    return 0;
}