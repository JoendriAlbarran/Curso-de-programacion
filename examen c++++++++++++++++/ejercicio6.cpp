#include <iostream>
int main() {
    int opcion;
    do {
        std::cout << "\n--- menu ---" << std::endl;
        std::cout << "1. saludar" << std::endl;
        std::cout << "2. despedirse" << std::endl;
        std::cout << "3. sali" << std::endl;
        std::cout << "elige una opcion: ";
        std::cin >> opcion;

        switch (opcion) {
            case 1:
                std::cout << "hola Que tengas un buen dia" << std::endl;
                break; 
            case 2:
                std::cout << "adios Vuelve pronto" << std::endl;
                break;
            case 3:
                std::cout << "saliendo del programa" << std::endl;
                break;
            default: 
                std::cout << "opcion no valida. Por favor intenta de nuevo" << std::endl;
                break;
        }

    } while (opcion != 3);

    return 0;
}
