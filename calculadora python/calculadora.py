# calculadora.py
import math
import random



def sumar(a, b):
  return a + b


def restar(a, b):
  return a - b


def multiplicar(a, b):
  return a * b


def dividir(a, b):
  if b == 0:
    return "Error: División entre cero"
  return a / b


def potenciar(base, exponente):
  return base**exponente


def modulo(a, b):
  if b == 0:
    return "Error: Módulo con divisor cero"
  return a % b



def raiz_cuadrada(a):
  if a < 0:
    return "Error: No existe raíz real para números negativos"
  return math.sqrt(a)


def coseno(grados):
  
  radianes = math.radians(grados)
  return math.cos(radianes)


def tangente(grados):
  
  if (grados - 90) % 180 == 0:
    return "Error: Tangente indefinida"
  radianes = math.radians(grados)
  return math.tan(radianes)



print("=== CALCULADORA CIENTÍFICA EN PYTHON ===")


num1 = random.randint(1, 20)
num2 = random.randint(1, 10)


angulo = random.randint(0, 360)

print(f"Valores aleatorios generados: a = {num1}, b = {num2}")
print(f"Ángulo aleatorio generado: {angulo}°\n")

print(f"Suma ({num1} + {num2}):", sumar(num1, num2))
print(f"Resta ({num1} - {num2}):", restar(num1, num2))
print(f"Multiplicación ({num1} * {num2}):", multiplicar(num1, num2))
print(f"División ({num1} / {num2}):", round(dividir(num1, num2), 4))
print(f"Potencia ({num1} ^ ${num2}):", potenciar(num1, num2))
print(f"Módulo ({num1} % {num2}):", modulo(num1, num2))

print("-" * 35)
print(f"Raíz cuadrada de {num1}:", round(raiz_cuadrada(num1), 4))
print(f"Coseno de {angulo}°:", round(coseno(angulo), 4))
print(f"Tangente de {angulo}°:", round(tangente(angulo), 4))
