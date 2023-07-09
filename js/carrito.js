
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


// Inicio de este Evento click para comprar en el carrito (llenado de formulario)
botonComprar.addEventListener("click", mostrarVentanaEmergente);

function mostrarVentanaEmergente() {
    // Crear elementos HTML para la ventana emergente
    const ventanaEmergente = document.createElement("div");
    ventanaEmergente.classList.add("ventana-emergente");

    const formulario = document.createElement("form");
    formulario.classList.add("formulario");

    const titulo = document.createElement("h2");
    titulo.textContent = "Completa tus datos";
    formulario.appendChild(titulo);

    const nombreLabel = document.createElement("label");
    nombreLabel.textContent = "Nombre:";
    const nombreInput = document.createElement("input");
    nombreInput.setAttribute("type", "text");
    nombreInput.setAttribute("required", "true");
    nombreLabel.appendChild(nombreInput);
    formulario.appendChild(nombreLabel);

    const telefonoLabel = document.createElement("label");
    telefonoLabel.textContent = "Teléfono:";
    const telefonoInput = document.createElement("input");
    telefonoInput.setAttribute("type", "number");
    telefonoInput.setAttribute("required", "true");
    telefonoLabel.appendChild(telefonoInput);
    formulario.appendChild(telefonoLabel);

    const direccionLabel = document.createElement("label");
    direccionLabel.textContent = "Dirección:";
    const direccionInput = document.createElement("input");
    direccionInput.setAttribute("type", "text");
    direccionInput.setAttribute("required", "true");
    direccionLabel.appendChild(direccionInput);
    formulario.appendChild(direccionLabel);

    const tarjetaLabel = document.createElement("label");
    tarjetaLabel.textContent = "Número de Tarjeta:";
    const tarjetaInput = document.createElement("input");
    tarjetaInput.setAttribute("type", "number");
    tarjetaInput.setAttribute("required", "true");
    tarjetaLabel.appendChild(tarjetaInput);
    formulario.appendChild(tarjetaLabel);

    const botonCerrar = document.createElement("button");
    botonCerrar.classList.add("boton-cerrar");
    botonCerrar.textContent = "Cerrar";
    formulario.appendChild(botonCerrar);

    const botonEnviar = document.createElement("button");
    botonEnviar.classList.add("boton-enviar");
    botonEnviar.setAttribute("type", "submit");
    botonEnviar.textContent = "Enviar datos";
    formulario.appendChild(botonEnviar);

    ventanaEmergente.appendChild(formulario);
    document.body.appendChild(ventanaEmergente);

    // Escuchar evento de cierre de la ventana emergente
    botonCerrar.addEventListener("click", cerrarVentanaEmergente);
    formulario.addEventListener("submit", enviarFormulario);
}

function cerrarVentanaEmergente() {
    const ventanaEmergente = document.querySelector(".ventana-emergente");
    ventanaEmergente.remove();
}

function enviarFormulario(event) {
    event.preventDefault();

    const nombre = event.target.elements[0].value;
    const telefono = event.target.elements[1].value;
    const direccion = event.target.elements[2].value;
    const tarjeta = event.target.elements[3].value;

 
    // Cerrar la ventana emergente
    cerrarVentanaEmergente();

    // Mostrar mensaje de agradecimiento
    const mensajeAgradecimiento = document.createElement("p");
    mensajeAgradecimiento.textContent = "¡Gracias por tu compra!";
    mensajeAgradecimiento.classList.add("mensaje-agradecimiento");
    contenedorCarritoComprado.appendChild(mensajeAgradecimiento);
}
//fin de este proceso


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