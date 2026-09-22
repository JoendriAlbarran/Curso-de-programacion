#Historia de resident evil

import sys
import time

print("\n======Historia de resident evil, eres Leon S. Kennedy, un novato que llegó tarde..... Pero temprano para vivir.======")

print("\nEres un oficial de la policia de Raccon City, y en tu primer dia de trabajo llegas tarde a la comisaria, ya que eres un alcoholico y te quedaste dormido")
time.sleep(3)

print("\npero llegas en la noche, pero todo está oscuro....")
time.sleep(3)

print("\nTe bajas de tu camioneta para echar gasolina, pero en eso ves sangre derramada en el suelo y ves una patrulla ")
time.sleep(3)

print ("\nPero no hay nadie, adentro hay un cadaver esposado con un tiro en la frente, lo miras y te das cuenta que algo no está bien......... Sus ojos y boca no son como otros cadaveres.....")
time.sleep(3)

print("\nNo sabes que hacer por novato, que haces? ")
#mostrar opciones a elegir
time.sleep(3)
print("1. Llamas refuerzos por radio")
print("2. Entras a la gasolinera a investigar")

#pide que escriba 1 o 2

pregunta = input("Elige una opción (1 o 2): ")

if pregunta== "1"    or pregunta == "2":

    if pregunta == "1":
        print("\nQue raro nadie contesta...")
        time.sleep(3)
        print ("\nDecides investigar tu mismo la gasolinera.....")
        time.sleep(3)

#camino 1 o 2 dice esto: 
    print("\nEntras y ves empleados muertos y ves un agente de la policia moribundo que tiene una mordida en el cuello...")
    time.sleep(3)
        
else:
    print("\nOpcion no valida. Te quedaste paralizado del susto en la oscuridad y te atacaron los zombis por la espalda y te mueres, fin del juego, gracias por jugar :)")
          
print(":\nIntentas ayudarlo pero es demasiado tarde, el agente muere, y escuchas cosas cayendose.....")
time.sleep(3)
print("\nEmpiezan a salir zombis y no tienes armas, solo tu radio y una linterna, empiezas a correr y sales ileso")
time.sleep(3)
print("\nTe montas en la patrulla y decides ir a la comisaria R.P.D para investigar que pasó, pero en el camino ves que la ciudad es un completo desastre......")
time.sleep(3)
print("\nLlegas a la comisaria, pero el porton principal está cerrado, y escuchas zombis a lo lejos por los callejones....")
time.sleep(3)

#Pregunta al usuario que hacer
1
print("\nComo entras a la comisaria?")
time.sleep(3)
print("\n1. Entras escalando la reja principa")
print("\n2. Busca otra entrada por el callejon")

sub_decision1 = input("\nElige una opcion (1 o 2): ")

if sub_decision1 == "1":
    print ("\nEscalas la reja y entras a la comisaria")
    time.sleep(3)
    print("\nEntras y ves la comisaria destruida, ves una maquina de escribir y armas en en el mostrador, te equipas")
    time.sleep(3)
    print("\nEmpiezas a buscar respuestas investigando la R.P.D. te encuentras a tu supervisor, Marvin Branagh, pero está mordido en el estomago y te dices que te salves tu solo")
    time.sleep(3)

elif sub_decision1 == "2":
    print("\nBuscas otra entrada por el callejon.... Grave error, te atacan los zombis y mueres, Fin del juego master")

else: 
    print("\nOpcion no valida. Te quedaste paralizado del susto en la oscuridad y te atacaron los zombis por la espalda y te mueres, fin del juego, gracias por jugar :)")

