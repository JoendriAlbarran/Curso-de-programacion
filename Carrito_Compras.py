# Carrito de compras
#Joendri Albarran

productos = []
precios = []

opcion = ""

while opcion != "5":
    print("\nMenu de compras")
    print("1. Agregar producto")
    print("2. Mostrar tu cesta")
    print("3. Eliminar producto")
    print("4. Calcular total")
    print("5. Renunciar")
    
    print("\nSeleccione una opcion (1-5):")
    opcion = input()

    # opcion 1 producto

    if opcion == "1":
        print("\nAgregar Producto")
        nombre = input("Nombre del producto: ")
        precio = float(input("Precio del producto: "))

    #float para los texto en sean numeros decimales en tal caso
        
        productos.append(nombre)
        precios.append(precio)
        print("Producto agregado con exito")

    #append para agregar un elemento

    # opcion 2 precio

    elif opcion == "2":
        print("\nMostrar cesta")
        if len(productos) == 0:
            print("La cesta esta vacia chamo")
        else:
            print("Lista de productos:")
            for i in range(len(productos)):
                print(i + 1, "-", productos[i], "$", precios[i])

        #len para contar los elementos en total

    # opcion 3 eliminar un producto

    elif opcion == "3":
        print("\nEliminar un producto")
        if len(productos) == 0:
            print("No hay productos para borrar chamo")
        else:
            print("Productos en la cestica:")
            for i in range(len(productos)):
                print(i + 1, "-", productos[i], "$", precios[i])
            
            print("Ingresa el numero del producto a quitar:")
            num = int(input())
            
            if num >= 1 and num <= len(productos):
                productos.pop(num - 1)
                precios.pop(num - 1)
                print("Producto betado")
            else:
                print("Numero malo, invalido perdon")

    # opcion 4 calcular el monto total

    elif opcion == "4":
        print("\nCalcular total")
        if len(productos) == 0:
            print("La cesta esta vacia. El total es: $0")
        else:
            total = 0
            for p in precios:
                total = total + p
            print("Total a pagar: $", total)

    # opcion 5 salir

    elif opcion == "5":
        print("\nSaliendo del juego")
        print("Gracias por usar el programa, me voy")
        print("Atentamente el alumno Joendri Albarran :)")

    else:
        print("\nOpcion no valida, intenta de nuevo chamo")