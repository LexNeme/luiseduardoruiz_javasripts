// Obtener los productos en el carrito desde el almacenamiento local
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
// Parsear los productos en el carrito de JSON a un objeto JavaScript
productosEnCarrito = JSON.parse(productosEnCarrito);

// Obtener referencias a los elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Función para cargar los productos en el carrito en cada contenedor correspondiente
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Mostrar los elementos relacionados con el carrito
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        // Limpiar el contenedor de productos en el carrito
        contenedorCarritoProductos.innerHTML = "";

        // Iterar sobre los productos en el carrito y crear elementos HTML para mostrarlos
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Producto</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>S/.${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>S/.${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });

        // Actualizar los botones de eliminar
        actualizarBotonesEliminar();
        // Actualizar el total
        actualizarTotal();
    } else {
        // Mostrar el mensaje de carrito vacío
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

// Cargar los productos en el carrito
cargarProductosCarrito();

// Función para actualizar los botones de eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    // Mostrar una notificación de "Producto eliminado"
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#7d590f",
          borderRadius: "4px",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    // Eliminar el producto del carrito
    productosEnCarrito.splice(index, 1);
    // Volver a cargar los productos en el carrito
    cargarProductosCarrito();

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Evento click para vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    // Mostrar un mensaje de confirmación utilizando la librería Swal
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar el carrito
            productosEnCarrito.length = 0;
            // Guardar los cambios en el almacenamiento local
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            // Volver a cargar los productos en el carrito
            cargarProductosCarrito();
        }
    });
}

// Función para actualizar el total
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `S/.${totalCalculado}`;
}

// Evento click para comprar el carrito
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    // Vaciar el carrito
    productosEnCarrito.length = 0;
    // Guardar los cambios en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Mostrar elementos relacionados con la compra exitosa
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}