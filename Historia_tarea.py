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
    sys.exit()
          
print(":\nIntentas ayudarlo pero es demasiado tarde, el agente muere, y escuchas cosas cayendose.....")
time.sleep(3)
print("\nEmpiezan a salir zombis y no tienes armas, solo tu radio y una linterna, empiezas a correr y sales ileso")
time.sleep(3)
print("\nTe montas en la patrulla y decides ir a la comisaria R.P.D para investigar que pasó, pero en el camino ves que la ciudad es un completo desastre......")
time.sleep(3)
print("\nLlegas a la comisaria, pero el porton principal está cerrado, y escuchas zombis a lo lejos por los callejones....")
time.sleep(3)

#Pregunta al usuario que hacer

print("\nComo entras a la comisaria?")
time.sleep(3)
print("\n1. Entras escalando la reja principa")
print("\n2. Busca otra entrada por el callejon")

sub_decision1 = input("\nElige una opcion (1 o 2): ")

if sub_decision1 == "1":
    print ("\nEscalas la reja y entras a la comisaria")
    time.sleep(3)
    print("\nEntras y ves la comisaria destruida, ves una maquina de escribir y una pistola en en el mostrador, te equipas")
    time.sleep(3)
    print("\nEmpiezas a buscar respuestas investigando la R.P.D. te encuentras a tu supervisor, Marvin Branagh, pero está mordido en el estomago y te dices que te salves tu solo")
    time.sleep(3)

elif sub_decision1 == "2":
    print("\nBuscas otra entrada por el callejon.... Grave error, te atacan los zombis y mueres, Fin del juego master")
    sys.exit()
#el comando sys.exit() para cerrar el juego

else: 
    print("\nOpcion no valida. Te quedaste paralizado del susto en la oscuridad y te atacaron los zombis por la espalda y te mueres, fin del juego, gracias por jugar :)")
    sys.exit()
#2do escenario sobre otra decision

print("\nLe haces caso a tu supervisor y caminas hacia el cuarto de seguridad...")
time.sleep(3)
print("\nAPARECE UN ZOMBI, QUE HACES?")
time.sleep(3)
print("\n1. Le disparas con tu pistola")
print("\n2. Le golpeas con la linterna para ahorrar balas y no alertar a los demas zombis")

sub_decision1 = input("\nElige una opcion (1 o 2): ")

if sub_decision1 == "1":
    print("\nLe disparas y lo matas, pero empiezan a salir mas zombis, y corres y te salvas, pero te quedan pocas balas")
    time.sleep(3)
    print("\nTe diriges al segundo piso, y encuentras una pc, es la pc de tu jefe Irons,ves, que tiene un pendrive en un puerto USB, dice que el virus T se salió de control y la cura está un pendrive de la PC")
    time.sleep(3)
    print("\nEscapas y te llevas el pendrive")
    time.sleep(3)
    print("\nSaliendo de la R.P.D te encuentras con un peloton del ejercito y les dices que en ese pendrive está la cura.....")
    time.sleep(3)
    print("\nLos militares te sacan ileso de Raccon City")
    time.sleep(3)
    print("\nFELICIDADES SOBREVIVISTE AL INCIDENTE Y EL GOBIERNO TE RECLUTA EN UN PROGRAMA SECRETO DE LA D.S.O")
    time.sleep(3)
    print("\n================GRACIAS POR JUGAR!! ==============")
    print("Atentamente el alumno Joendri Albarran :)")

elif sub_decision1 == "2":
        print("\nLe golpeas con la linterna y lo matas, pero empiezan a salir mas zombis y te rodean, empiezan a salir perros tambien...")
        time.sleep(3)
        print("\nTe rodean y te comen entre todos, festin para los zombis")
        time.sleep(2)
        print("\nGAME OVER")
        sys.exit()

else:
     print("\nLo piensas mucho y el zombi te agarra y te muerde el cuello.... Mueres")
     time.sleep(3)
     print("\nGAME OVER")
     sys.exit()
