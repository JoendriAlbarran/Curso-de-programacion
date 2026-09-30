#Historia de resident evil

#Joendri Albarran

#estos comandos para activar la finalizacion del juego, y el otro para darle tiempo a cada salida de texto, para que se pueda leer

import sys
import time


print("\n======Historia de resident evil, eres Leon S. Kennedy, un novato que llegó tarde..... Pero temprano para vivir.======")

# el comando time.sleep(x numero) para darle un tiempo de salida cada texto

print("\nEres un oficial de la policia de Raccon City, y en tu primer dia de trabajo llegas tarde a la comisaria, ya que eres un alcoholico y te quedaste dormido")
time.sleep(3)

#nivel 1

print("\n=====Nivel 1: LA GASOLINERA O LA BOMBA===== ")
time.sleep(3)

print("\nVas en tu vehiculo, pero llegas en la noche, pero todo está oscuro....")
time.sleep(3)

print("\nTe bajas de tu camioneta para echar gasolina, pero en eso ves sangre derramada en el suelo y ves una patrulla ")
time.sleep(3)

print ("\nPero no hay nadie, adentro hay un cadaver esposado con un tiro en la frente, lo miras y te das cuenta que algo no está bien.........") 
time.sleep(3)
print("\nSus ojos y boca no son como otros cadaveres.....")
time.sleep(3)

print("\nNo sabes que hacer por novato, que haces? llamas refuerzos en la radio o huyes o investigas la gasoliner????? ")

#mostrar opciones a elegir

time.sleep(3)

print("\nOpciones: RADIO | HUIR | GASOLINERA")
time.sleep(2)

#la opcion #.lower() para las minisculas, y el .strip() para omitir los espacios fanstasmas

pregunta = input("Escribe tu opcion:").lower().strip()

if pregunta== "radio"    or pregunta == "gasolinera":

    if pregunta == "radio":
        print("\nQue raro nadie contesta...")
        time.sleep(3)
        print ("\nDecides investigar tu mismo la gasolinera.....")
        time.sleep(3)

elif pregunta == "huir":
    print("Huyes a toda velocidad corriendo, pero te caiste y te doblaste el tobillo, te desmayas y un zombi te come")
    time.sleep(2)
    print("\nGAME OVER")
    sys.exit()
else:
    print("\nOpcion no valida. Te quedaste paralizado del susto en la oscuridad y te atacaron los zombis por la espalda y te mueres, fin del juego, gracias por jugar :)")
    sys.exit()  

 #nivel 2

print("\n=====NIVEL 2: ADENTRO DE LA TIENDA=====")  

#camino radio y gasolinera dice esto: 
print("\nEntras y ves empleados muertos y ves un agente de la policia moribundo que tiene una mordida en el cuello...")
time.sleep(3)
               
print("\nIntentas ayudarlo pero es demasiado tarde, el agente muere, y escuchas cosas cayendose.....")
time.sleep(3)
print("\nEmpiezan a salir zombis y no tienes armas, solo tu radio y una linterna, como haces?")
time.sleep(3)
print("\nOpciones: DISPARAR | LINTERNA | EMPUJAR")

pregunta_tienda = input("Escribe tu opcion para sobrevivir:").lower().strip()

if pregunta_tienda == "disparar":
    print("No tienes balas, pero le pegas un culatazo al zombi mas cercano, y te abres paso a la salida")
    time.sleep(2)

elif pregunta_tienda =="linterna":
    print("Le pegas un linternazo al zombi que se te lanzó y con suerte escapas")
    time.sleep(2)

elif pregunta_tienda == "empujar":
    print("Empujas unos estantes de alimentos sobre los zombis hambrientos, ganas tiempo y te vas corriendo a la patrulla")
    time.sleep(2)
else:
    print("\n Mi hermano te quedaste pensando en pajaritos preñados y te comieron los zombis por no escribir bien")
    sys.exit()

print("\nTe montas en la patrulla y decides ir a la comisaria R.P.D para investigar que pasó, pero en el camino ves que la ciudad es un completo desastre......")
time.sleep(3)

#nivel 3 la comisaria

print("\n=====Nivel 3: La Comisaria de Policia de Raccoon City=====")
time.sleep(2)

print("\nLlegas a la comisaria, pero el porton principal está cerrado, y escuchas zombis a lo lejos por los callejones....")
time.sleep(3)

#Pregunta al usuario que hacer

print("\nComo entras a la comisaria?")
time.sleep(3)
print("\nOpciones: REJA | VENTANA | CALLEJON")


sub_decision1 = input("\n Escribe tu opcion de preferencia:").lower().strip()

if sub_decision1 == "reja":
    print ("\nEscalas la reja y entras a la comisaria")
    time.sleep(3)

elif sub_decision1 == "ventana":
    print("Rompes la ventana y entras a la R.P.D, te limpias los vidrio rotos con tu chaqueta")
    time.sleep(2)

elif sub_decision1 == "callejon":
    print("\nBuscas otra entrada por el callejon.... Grave error, te atacan los zombis y mueres, Fin del juego master")
    sys.exit()

else:
     print("Opcion no valida, te quedaste pegado y los zombis se te lanzaron, game over")
     sys.exit()

#el comando sys.exit() para cerrar el juego

print("\n=====Nivel 4: Adentro de tu oficina.....=====")
time.sleep(2)

print("\nEntras y ves la comisaria destruida, ves una maquina de escribir y una pistola en en el mostrador")
time.sleep(3)

print("\nTe equipas con la pistola, ahora quieres investigar? o quieres revisar la pistola? o la linterna? ")
time.sleep(2)

print("\nOpciones: EQUIPAR | EXAMINAR | LINTERNA ")

rpd_interno = input("Escribe tu opcion:").lower().strip()

if rpd_interno == "equipar":
    print("La equipas y estas listo para disparar")
    time.sleep(2)

elif rpd_interno == "examinar":
    print("Examinas las notas de la maquinas de escribir y avanzas")
    time.sleep(3)

elif rpd_interno == "linterna":
    print("Enciendes la linterna para iluminar los caminos oscuros de una parte de la comisaria")
    time.sleep(2)

else:
    print("\nEscribiste mal y perdiste, te llevó algo asechando el techo.... Game over")
    sys.exit()

#nivel 5

print("\n=====NIVEL 5: EL REENCUENTRO CON MARVIN=====")
time.sleep(2)

print("\nEmpiezas a buscar respuestas investigando la R.P.D. te encuentras a tu supervisor, Marvin Branagh, pero está mordido en el estomago y te dices que te salves tu solo")
time.sleep(3)
print("\nQue le dices a marvin???")
time.sleep(2)
print("\nOpciones: AYUDAR | PREGUNTAR | AVANZAR")

marvin_rpd = input ("\nEscribe una opcion:").lower().strip()

if marvin_rpd== "ayudar":
    print("\n intentas buscar un botiquin de primero auxilios, pero marvin te dice que no pierdas tiempo...")
    time.sleep(2)

elif marvin_rpd== "preguntar":
    print("\nLe preguntas que pasó y te dice que un virus extraño revive a los muertos")
    time.sleep(2)

elif marvin_rpd== "avanzar":
    print("Le haces caso a tu supervisor, le prometes que sobreviviras y avanzas hacia el cuarto de seguridad")
    time.sleep(2)

else:
    print("No le hiciste caso y un zombi entra y te muerde, Game over")
    sys.exit()

#el nivel 6

print("\n===== NIVEL 6: EL PASILLO DE SEGURIDAD")
time.sleep(2)

print("\nLe haces caso a tu supervisor y caminas hacia el cuarto de seguridad...")
time.sleep(3)
print("\nAPARECE UN ZOMBI, QUE HACES?")
time.sleep(3)
print("\nOpciones: DISPARAR | LINTERNA | ESQUIVAR")
sub_decision1 = input("\nEscribe una opcion:").lower().strip()

if sub_decision1 == "disparar":
    print("\nLe disparas y lo matas, pero empiezan a salir mas zombis, y corres y te salvas, pero te quedan pocas balas")
    time.sleep(3)

elif sub_decision1 == "linterna":
    print("\nLe golpeas con la linterna y lo matas, pero empiezan a salir mas zombis y te rodean, empiezan a salir perros tambien...")
    time.sleep(3)
    print("\nTe rodean y te comen entre todos, festin para los zombis")
    time.sleep(2)
    print("\nGAME OVER")
    sys.exit()

elif sub_decision1== "esquivar":
    print("\nEsquivas al canijo de su mae, y no alertas a los demas y subes las escaleras")
    time.sleep(2)

else:
    print("\nLo piensas mucho y el zombi te agarra y te muerde el cuello.... Mueres")
    time.sleep(3)
    print("\nGAME OVER")
    sys.exit()

#nivel 7

print("\n=====NIVEL 7: LA PC DEL PEDOFILO IRONS=====")
time.sleep(2)

print("\nTe diriges al segundo piso, y encuentras una pc, es la pc de tu jefe Irons,ves, que tiene un pendrive en un puerto USB, dice que el virus T se salió de control y la cura está un pendrive de la PC")
time.sleep(3)
print("\nQue decision tomas????")
time.sleep(3)
print("Opciones: PENDRIVE | LEER | GUARDAR ")

pendrive_irons = input("\nEscribe una opcion:").lower().strip()

if pendrive_irons == "pendrive":
    print("\nSales de la oficina de Irons y te guardas el pendrive en el bolsillo")
    time.sleep(2)

elif pendrive_irons == "leer":
    print("\n Lees rapidamente confirmando la informacion y te llevas el pendrive")
    time.sleep(2)

elif pendrive_irons == "guardar":
    print("\n T guardas el pendrive en el chaleco")
    time.sleep(2)

else:
    print("Opcion no valida, una horda rompió la puerta y te comieron, game over")
    sys.exit()

#nivel 8, mister equis

print("\n=====NIVEL 8: Mr. X=====")
time.sleep(2)

print("\n Al salir de la oficina escuchas unos pasos pesados que te dan miedo, y fuertes en todo el pasillo.......")
time.sleep(3)
print("\nDe la nada un gigante de dos metros con chaqueta blindada y gorrito (Mr. X) rompe la pared y te tapa la salida...")
time.sleep(3)
print("\nQue haces frente a esta amenaza?")
print("\nOpciones: CEGADORA | DISPARAR | ESCONDERSE")

pregunta_mrx = input("\nEscribe una opcion:").lower().strip()
if pregunta_mrx== "cegadora":
        print("\nLOGRAS ATURDIRLO!! huyes por el hueco que abrió")
        time.sleep(2)

elif pregunta_mrx== "disparar":
        print("\nLas balas no le hacen ni cosquillas y camina rápido hacía ti y te agarró del cuello y te revienta la cara contra el piso")
        time.sleep(3)
        print("\nGame over")
        sys.exit()

elif pregunta_mrx== "esconderse":
        print("\nTe tiras detras un escritorio roto y Mr. X tira un golpe al aire y aprovechas y escapas por el hueco")
        time.sleep(2)

else:
        print("\nTe quedaste congelado y el Mr. X te aplastó como una papa")
        sys.exit()

#nivel 9 papa

print("\n=====NIVEL 9: EL ESCAPE POR EL PATIO DE LA RPD=====")

print("\n Logras salir al patio, buscando una salida....")
time.sleep(3)
print("\nUn grupo de infectados bloquea el porton de la salida de atras")
time.sleep(2)
print("Como te abres por ahi??")
print("Opciones: CORRER | EMPUJAR | DISPARAR")

rpd_exterior = input ("\n Escribe una opcion:").lower().strip()

if rpd_exterior == "correr":
        print("Corres a toda madre y esquivas a los zombis, y llegas al porto")
        time.sleep(2)

elif rpd_exterior == "disparar":
    print("Disparas a los zombis y despejas el camino, pasas el porton...")
    time.sleep(2)

elif rpd_exterior == "empujar":
        print("Usar la fuerza de tu hombro y con el chaleco tumbas algunos zombis y consigues avanzar, con suerte")
        time.sleep(2)

else:
        print("Opcion no valida, los zombis te comieron y perdiste")
        sys.exit()

#nivel final el 10

print("\n=====NIVEL 10: EL PELOTON Y EL FINAL=====")
time.sleep(2)

print("\nSaliendo de la R.P.D te encuentras con un peloton del ejercito y les dices que en ese pendrive está la cura.....")
time.sleep(3)
print("\nRepampanos, te perseguia el Mr. X por ultima vez, rompe la reja trasera, parece que ese tipo quiere la cura.... ")
time.sleep(2)
print("\nQue haces???? ves un lanzacohete en el suelo ")
print("\nOpciones: CURA | LANZACOHETES | DISPARAR ")

final = input("\nEscriba una opcion....:").lower().strip()

if final == "cura":
        print("\nle gritas a ese sujeto (Aqui tengo la cura) y los militares te cubren inmediatamente..")
        time.sleep(2)

elif final == "lanzacohetes":
        print("\nLe metes un rpjaso y lo terminas matando de una vez")
        time.sleep(2)

elif final == "disparar":
        print("\n le disparas a un tanque de gasolina y lo debilitas, ahora los militares te aseguran")
        time.sleep(2)

else:
        print("\nTe quedaste pegado y te mato el señor de dos metros y medio, fin del juego crack")
        sys.exit()


print("\nLos militares te sacan ileso de la ciudad y se encargan de la amenaza")
time.sleep(2)
print("\nFELICIDADES SOBREVIVISTE AL INCIDENTE Y EL GOBIERNO TE RECLUTA EN UN PROGRAMA SECRETO DE LA D.S.O")
time.sleep(3)
print("\n================GRACIAS POR JUGAR!! ==============")
print("Atentamente el alumno Joendri Albarran :)")