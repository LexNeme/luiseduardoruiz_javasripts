// Declarar variables
let nombreUsuario;
let productosComprados = [];
let continuarComprando = true;

// Objeto de productos disponibles
const productosDisponibles = [
  {
    nombre: "Chaqueta de cuero",
    precio: 250,
    talla: "M",
    color: "Negro",
    caracteristicas: ["Cierre frontal", "Bolsillos laterales", "Forro interior"]
  },
  {
    nombre: "Bolso de cuero",
    precio: 150,
    talla: "Única",
    color: "Marrón",
    caracteristicas: ["Correa ajustable", "Cierre magnético", "Bolsillo interno"]
  },
  {
    nombre: "Zapatos de cuero",
    precio: 135,
    talla: "40",
    color: "Negro",
    caracteristicas: ["Suela antideslizante", "Plantilla acolchada", "Detalle de costuras"]
  },
  {
    nombre: "Cinturón de cuero",
    precio: 25,
    talla: "85 cm",
    color: "Negro",
    caracteristicas: ["Hebilla metálica", "Diseño clásico", "Ajustable"]
  },
  // Agregar 8 productos adicionales con talla, color y características
  {
    nombre: "Guantes de cuero",
    precio: 50,
    talla: "L",
    color: "Negro",
    caracteristicas: ["Forro interior de lana", "Detalle de costuras", "Cierre de velcro"]
  },
  {
    nombre: "Billetera de cuero",
    precio: 80,
    talla: "Única",
    color: "Marrón",
    caracteristicas: ["Compartimentos para tarjetas", "Bolsillo para monedas", "Diseño compacto"]
  },
  {
    nombre: "Sombrero de cuero",
    precio: 90,
    talla: "57 cm",
    color: "Negro",
    caracteristicas: ["Banda interior ajustable", "Protección contra rayos UV", "Estilo clásico"]
  },
  {
    nombre: "Mochila de cuero",
    precio: 200,
    talla: "Única",
    color: "Marrón",
    caracteristicas: ["Compartimento acolchado para portátil", "Bolsillos laterales", "Correas ajustables"]
  },
  {
    nombre: "Botas de cuero",
    precio: 180,
    talla: "42",
    color: "Negro",
    caracteristicas: ["Cierre de cremallera", "Suela resistente", "Detalle de hebillas"]
  },
  {
    nombre: "Cartera de cuero",
    precio: 120,
    talla: "Única",
    color: "Negro",
    caracteristicas: ["Compartimentos para billetes", "Bolsillo para monedas", "Diseño elegante"]
  },
  {
    nombre: "Chaleco de cuero",
    precio: 160,
    talla: "L",
    color: "Marrón",
    caracteristicas: ["Cierre frontal de botones", "Bolsillos frontales", "Detalle de costuras"]
  },
  {
    nombre: "Portafolio de cuero",
    precio: 150,
    talla: "Única",
    color: "Negro",
    caracteristicas: ["Compartimento para documentos", "Bolsillos internos", "Cierre de cremallera"]
  }
];

// Función para mostrar productos disponibles y solicitar elección
function mostrarProductos() {
  let opciones = "";
  for (let i = 0; i < productosDisponibles.length; i++) {
    opciones += `${i + 1}. ${productosDisponibles[i].nombre} - Talla: ${productosDisponibles[i].talla} - Color: ${productosDisponibles[i].color} - Precio: ${productosDisponibles[i].precio}\n`;
  }
  return parseInt(prompt(`Ingrese el número del producto que desea comprar:\n${opciones}`));
}

// Función para solicitar cantidad de productos
function solicitarCantidad() {
  return parseInt(prompt("Ingrese la cantidad que desea comprar:"));
}

// Mostrar mensaje de bienvenida
prompt("¡Bienvenido a la tienda en línea de cuero!");

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
    talla: producto.talla,
    color: producto.color,
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

// Mostrar resumen de la compra con el precio de cada producto
let resumenCompra = `Resumen de la compra de ${nombreUsuario}:\n\n`;
let totalCompra = 0;

for (let i = 0; i < productosComprados.length; i++) {
  let producto = productosComprados[i];
  resumenCompra += `Producto: ${producto.nombre}\n`;
  resumenCompra += `Talla: ${producto.talla}\n`;
  resumenCompra += `Color: ${producto.color}\n`;
  resumenCompra += `Cantidad: ${producto.cantidad}\n`;
  resumenCompra += `Precio unitario: $${producto.precioUnitario}\n`;
  resumenCompra += `Total: $${producto.total}\n\n`;
  totalCompra += producto.total;
}

resumenCompra += `Total de la compra: $${totalCompra}`;

prompt(resumenCompra);
prompt("¡Gracias por su compra, " + nombreUsuario + "! Esperamos que disfrute de sus productos de cuero.");