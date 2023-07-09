// Declaración del array de productos
let productos = [];

// Obtener los datos de productos desde un archivo JSON
fetch("./js/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos();
  });

// Obtener referencias a los elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

const buscador = document.querySelector("#buscador");
buscador.addEventListener("input", filtrarProductos);

function filtrarProductos() {
    const texto = buscador.value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
      producto.titulo.toLowerCase().includes(texto)
    );
    cargarProductos(productosFiltrados);
}


// Event listener para ocultar el aside al hacer clic en un botón de categoría
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

// Función para cargar los productos en el contenedor
function cargarProductos(productosElegidos = productos) {
    // Limpiar el contenedor de productos
    contenedorProductos.innerHTML = "";

    // Iterar sobre los productos y crear elementos HTML para mostrarlos
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">S/.${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    // Actualizar los botones de agregar al carrito
    actualizarBotonesAgregar();
}

// Event listener para los botones de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Obtener el producto de la categoría seleccionada
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

// Función para actualizar los botones de agregar al carrito
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Declaración de la variable para almacenar los productos en el carrito
let productosEnCarrito;

// Obtener los productos en el carrito desde el almacenamiento local
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    // Si hay productos en el carrito almacenados, asignarlos a la variable
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarnumero();
} else {
    // Si no hay productos en el carrito almacenados, inicializar la variable como un array vacío
    productosEnCarrito = [];
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    // Mostrar una notificación de "Producto agregado"
    Toastify({
        text: "Producto agregado",
        duration: 2500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "#7d590f",
        borderRadius: "4px",
        textTransform: "uppercase",
        fontSize: "14px"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){}
}).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Si el producto ya está en el carrito, incrementar su cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Actualizar el contador de productos en el carrito
    actualizarnumero();

    // Guardar los productos en el carrito en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Función para actualizar el contador de productos en el carrito
function actualizarnumero() {
    let nuevonumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevonumero;
}

