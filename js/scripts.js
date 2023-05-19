// Declarar variables
let productoElegido;
let cantidad;
let precioUnitario;

// Función para mostrar productos disponibles y solicitar elección
function mostrarProductos() {
  return parseInt(prompt("Ingrese el número del producto que desea comprar:\n1. Chaqueta de cuero\n2. Bolso de cuero\n3. Zapatos de cuero\n4. Cinturón de cuero"));
}

// Función para solicitar cantidad de productos
function solicitarCantidad() {
  return parseInt(prompt("Ingrese la cantidad que desea comprar:"));
}

// Mostrar mensaje de bienvenida
prompt("¡Bienvenido a la tienda en línea de cuero! \n precionar aceptar para continuar");

// Mostrar productos disponibles y solicitar elección
productoElegido = mostrarProductos();

while (productoElegido < 1 || productoElegido > 4) {
  prompt("El número de producto ingresado no es válido.");
  productoElegido = mostrarProductos();
}

// Asignar precio unitario según el producto elegido
if (productoElegido === 1) {
  precioUnitario = 250;
  prompt("Ha elegido una chaqueta de cuero.");
} else if (productoElegido === 2) {
  precioUnitario = 150;
  prompt("Ha elegido un bolso de cuero.");
} else if (productoElegido === 3) {
  precioUnitario = 135;
  prompt("Ha elegido unos zapatos de cuero.");
} else if (productoElegido === 4) {
  precioUnitario = 25;
  prompt("Ha elegido un cinturón de cuero.");
}

// Solicitar confirmación de compra
let confirmacion = prompt("¿Desea continuar con la compra? (Ingrese 'si' o 'no')");

while (confirmacion !== "si" && confirmacion !== "no") {
  confirmacion = prompt("Respuesta inválida. ¿Desea continuar con la compra? (Ingrese 'si' o 'no')");
}

if (confirmacion === "no") {
  productoElegido = mostrarProductos();
}

// Solicitar cantidad al usuario
cantidad = solicitarCantidad();

// Calcular el total de la compra
let total = precioUnitario * cantidad;

// Mostrar el total de la compra
prompt("El total de la compra es: $" + total);

// Bucle for para imprimir un mensaje de agradecimiento por cada producto comprado
for (let i = 0; i < cantidad; i++) {
  prompt("¡Gracias por comprar nuestro producto de cuero!");
}

prompt("¡Esperamos que disfrute su compra!");