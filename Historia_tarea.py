#Historia de resident evil

import sys
import time

print("======Historia de resident evil, eres Leon S. Kennedy, un novato que llegó tarde..... Pero temprano para vivir.======")

print("\nEres un oficial de la policia de Raccon City, y en tu primer dia de trabajo llegas tarde a la comisaria, ya que eres un alcoholico y te quedaste dormido")
time.sleep(3)

print("\npero llegas en la noche, pero todo está oscuro....")
time.sleep(3)

print("\nTe bajas de tu camioneta para echar gasolina, pero en eso ves sangre derramada en el suelo y ves una patrulla ")
time.sleep(3)

print ("\nPero no hay nadie, adentro hay un cadaver esposado con un tiro en la frente, lo miras y te das cuenta que algo no está bien......... Sus ojos y boca no son como otros cadaveres.....")
time.sleep(3)

pregunta = print("\nNo sabes que hacer por novato, que haces? ")
#mostrar opciones a elegir
time.sleep(3)
print("1. Llamas refuerzos por radio")
print("2. Entras a la gasolinera a investigar")

#pide que escriba 1 o 2

pregunta = input("Elige una opción (1 o 2): ")

if pregunta == "1":
    print("\nQue raro nadie contesta...")

elif pregunta == "2":
    print("Entras y ves empleados muertos y ves un agente de la policia moribundo que tiene una mordida en el cuello...")

else: 
     print("Opcion no valida. Te quedaste paralizado del susto en la oscuridad y te atacaron los zombis por la espalda y te mueres, fin del juego, gracias por jugar :)")