// Declarar variables
let nombreUsuario;
let productosComprados = [];
let continuarComprando = true;

// Objeto de productos disponibles
const productosDisponibles = [
  { nombre: "Chaqueta de cuero", precio: 250 },
  { nombre: "Bolso de cuero", precio: 150 },
  { nombre: "Zapatos de cuero", precio: 135 },
  { nombre: "Cinturón de cuero", precio: 25 }
];

// Función para mostrar productos disponibles y solicitar elección
function mostrarProductos() {
  let opciones = "";
  for (let i = 0; i < productosDisponibles.length; i++) {
    opciones += `${i + 1}. ${productosDisponibles[i].nombre}\n`;
  }
  return parseInt(prompt(`Ingrese el número del producto que desea comprar:\n${opciones}`));
}

// Función para solicitar cantidad de productos
function solicitarCantidad() {
  return parseInt(prompt("Ingrese la cantidad que desea comprar:"));
}

// Mostrar mensaje de bienvenida
prompt("¡Bienvenido a la tienda en línea de cuero!, presione aceptar");

// Solicitar nombre del usuario
while (!nombreUsuario) {
  nombreUsuario = prompt("Por favor, ingrese su nombre:");
}

// Bucle para comprar productos
while (continuarComprando) {
  // Mostrar productos disponibles y solicitar elección
  let productoElegido = mostrarProductos();

  while (productoElegido < 1 || productoElegido > productosDisponibles.length) {
    prompt("El número de producto ingresado no es válido.");
    productoElegido = mostrarProductos();
  }

  // Obtener producto seleccionado
  let producto = productosDisponibles[productoElegido - 1];

  // Solicitar cantidad al usuario
  let cantidad = solicitarCantidad();

  // Calcular el total de la compra
  let total = producto.precio * cantidad;

  // Agregar producto y cantidad a la lista de compras
  productosComprados.push({
    nombre: producto.nombre,
    cantidad: cantidad,
    precioUnitario: producto.precio,
    total: total
  });

  // Solicitar confirmación de compra
  let confirmacion = prompt("¿Desea continuar comprando? (Ingrese 'si' o 'no')");

  while (confirmacion !== "si" && confirmacion !== "no") {
    confirmacion = prompt("Respuesta inválida. ¿Desea continuar comprando? (Ingrese 'si' o 'no')");
  }

  if (confirmacion === "no") {
    continuarComprando = false;
  }
}

// Mostrar resumen de la compra
let resumenCompra = `Resumen de la compra de ${nombreUsuario}:\n\n`;
let totalCompra = 0;

for (let i = 0; i < productosComprados.length; i++) {
  let producto = productosComprados[i];
  resumenCompra += `Producto: ${producto.nombre}\n`;
  resumenCompra += `Cantidad: ${producto.cantidad}\n`;
  resumenCompra += `Precio unitario: $${producto.precioUnitario}\n`;
  resumenCompra += `Total: $${producto.total}\n\n`;
  totalCompra += producto.total;
}

resumenCompra += `Total de la compra: $${totalCompra}`;

prompt(resumenCompra);

prompt("¡Gracias por su compra, " + nombreUsuario + "! Esperamos que disfrute de sus productos de cuero.");