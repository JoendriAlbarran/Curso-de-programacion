# La Cestica Digital - Tienda Interactiva de Joendri Albarran

Una aplicación web de comercio electrónico y simulador de compras interactivo con **HTML5 semántico**, **CSS3 moderno (Glassmorphism & Drawer)** y **JavaScript ES6+**.

---

## 💡 ¿Cuál es la nueva dinámica de esta web?

A diferencia de la página anterior (que era un portal de productividad personal con tareas y reloj), esta web implementa la dinámica de una **Tienda en Línea / E-Commerce Interactivo en Vivo**:

1. **Catálogo de productos interactivo**:
   - Tarjetas dinámicas con iconos vectoriales, precios y etiquetas de categoría.
   - **Buscador en tiempo real**: filtra instantáneamente mientras escribes en el campo de búsqueda.
   - **Filtros por categoría**: Tecnología, Snacks & Café, Accesorios y Artículos Creados por el Usuario.
   - **Ordenamiento**: por precio (menor a mayor / mayor a menor) o alfabético.

2. **La Cestica (Carrito de Compras Deslizante - Slide-over Drawer)**:
   - Contador dinámico en el botón de la barra superior que vibra (animación `bump`) al agregar artículos.
   - Panel lateral que se abre suavemente desde la derecha.
   - Controles de cantidad (`+` y `-`) que actualizan los subtotales en tiempo real.
   - Opción para eliminar productos individuales o vaciar la cesta por completo.
   - Mensaje amigable cuando está vacía: *"¡La cestica está vacía, chamo!"* (homenaje directo al script `Carrito_Compras.py`).

3. **Sistema de Descuentos con Cupón**:
   - Ingresa el código promocional **`CHAMO10`** o **`JOENDRI`** para obtener un 10% de descuento en el total.

4. **Cálculo Financiero Completo**:
   - Desglose instantáneo de Subtotal, Descuento aplicado, IVA (16%) y Total a pagar.

5. **Creador de Productos Personalizados**:
   - Un formulario interactivo que permite al usuario añadir nuevos productos al catálogo con nombre, precio, categoría y emoji, persistiendo los datos con `localStorage`.

6. **Modal de Factura / Ticket de Compra**:
   - Al finalizar el pedido, genera un recibo digital interactivo con número de orden aleatorio, fecha y hora exacta, desglose de productos y botón para imprimir o guardar.

---

## 📁 Archivos del Proyecto

```text
tienda-cestica/
├── index.html    # Estructura semántica, catálogo, drawer del carrito y modal de factura
├── styles.css    # Paleta de colores cálida/tecnológica, drawer animado y modo claro/oscuro
├── script.js     # Estado de la tienda, lógica del carrito, filtros, cupones y localStorage
└── README.md     # Documentación y guía explicativa
```

---

## 🚀 ¿Cómo abrir la tienda en tu navegador?

1. Ve a tu carpeta:
   `c:\Users\Joendri Albarran\Desktop\Carpeta programacion\Curso-de-programacion\tareas de webs\dia3\tienda-cestica\`
2. Haz doble clic sobre el archivo **`index.html`** para abrirlo en Google Chrome, Microsoft Edge, Firefox o tu navegador de preferencia.
