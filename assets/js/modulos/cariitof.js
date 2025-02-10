// Obtener referencias a los elementos del DOM
const btnAddDeseo = document.querySelectorAll(".btnAddDeseo");
const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnDeseo = document.getElementById("btnCantidadDeseo");
const btnCarrito = document.getElementById("btnCantidadCarrito");
const verCarrito = document.getElementById("verCarrito");
const tableListaCarrito = document.querySelector('#tableListaCarrito tbody');
const tablaLista = document.querySelector("#tablaListaCarrito tbody");
const myModal = document.getElementById('myModal');

// Inicializamos las listas (vacías) por defecto
let listaDeseo = [];
let listaCarrito = [];

// Al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
    // 1) Verificar si hay algo en sessionStorage para 'listaDeseo'
    if (sessionStorage.getItem("listaDeseo")) {
        listaDeseo = JSON.parse(sessionStorage.getItem("listaDeseo"));
    }

    // 2) Verificar si hay algo en sessionStorage para 'listaCarrito'
    if (sessionStorage.getItem("listaCarrito")) {
        listaCarrito = JSON.parse(sessionStorage.getItem("listaCarrito"));
    }

    // 3) Asignar eventos a botones "Agregar a Deseos"
    btnAddDeseo.forEach((btn) => {
        btn.addEventListener("click", function () {
            let id_producto = btn.getAttribute("prod");
            agregarDeseo(id_producto);
        });
    });

    // 4) Asignar eventos a botones "Agregar a Carrito"
    btnAddCarrito.forEach((btn) => {
        btn.addEventListener("click", function () {
            let id_producto = btn.getAttribute("prod");
            agregarCarrito(id_producto, 1);
        });
    });

    // 5) Mostrar la cantidad inicial de items en deseos y carrito
    cantidadDeseo();
    cantidadCarrito();

    // 6) Botón "verCarrito" abre el modal y carga la lista
    if (verCarrito) {
        const modalBootstrap = new bootstrap.Modal(myModal); 
        verCarrito.addEventListener('click', function() {
            getListaCarrito(); 
            modalBootstrap.show();
        });
    }
});

// Actualiza el número en el ícono de deseos
function cantidadDeseo() {
    if (listaDeseo && btnDeseo) {
        btnDeseo.textContent = listaDeseo.length;
    }
}

// Actualiza el número en el ícono de carrito
function cantidadCarrito() {
    if (listaCarrito && btnCarrito) {
        btnCarrito.textContent = listaCarrito.length;
    } else if (btnCarrito) {
        btnCarrito.textContent = 0;
    }
}

// Agrega productos al carrito
function agregarCarrito(id_producto, cantidad) {
    // Verificamos si el producto ya existe en listaCarrito
    for (let i = 0; i < listaCarrito.length; i++) {
        if (listaCarrito[i]["id_producto"] == id_producto) {
            Swal.fire("Aviso?", "El producto ya está agregado", "warning");
            return;
        }
    }
    // Si llegamos aquí, el producto NO existe, lo agregamos
    listaCarrito.push({
        id_producto: id_producto,
        cantidad: cantidad,
    });
    // Guardamos en sessionStorage (importante mantener consistencia)
    sessionStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));

    Swal.fire("Aviso?", "Producto agregado al carrito", "success");
    // Actualizamos contador
    cantidadCarrito();
}

// ejemplo de función "agregarDeseo"
function agregarDeseo(id_producto) {
    // Lógica similar a carrito
    const existe = listaDeseo.findIndex(item => item.id_producto == id_producto);
    if (existe >= 0) {
        Swal.fire("Aviso?", "El producto ya está en la lista de deseos", "warning");
        return;
    }
    listaDeseo.push({ id_producto: id_producto });
    sessionStorage.setItem("listaDeseo", JSON.stringify(listaDeseo));
    Swal.fire("Aviso", "Producto agregado a deseos", "success");
    cantidadDeseo();
}

// Carga la lista del carrito desde el servidor
function getListaCarrito(){
    const url = base_url + 'principal/getListaCarrito';
    const http = new XMLHttpRequest();
    http.open('POST', url, true);
    // Enviamos listaCarrito al servidor
    http.send(JSON.stringify(listaCarrito));

    http.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            // Parseamos respuesta
            const res = JSON.parse(this.responseText);
            console.log(res);

            // Construimos el HTML
            let html = '';
            // IMPORTANTE: Revisar la estructura de `res.productos`
            // Si es un array => res.productos.forEach(...)
            if (res.productos) {
                res.productos.forEach(producto => {
                    // Ajustar nombres de propiedades según tu JSON real
                    html += `<tr>
                        <td>
                            <img class="img-thumbnail rounded-circle" src="${producto.imagen_producto}" alt="" style="width: 60px;">
                        </td>
                        <td>${producto.nombre_producto}</td>
                        <td>${producto.costo_producto}</td>
                        <td>${producto.cantidad}</td>
                        <td>Total</td>
                        <td><button class="btn btn-danger" type="button">Eliminar</button></td>
                    </tr>`;
                });
            }
            // Llenamos la tabla
            if(tableListaCarrito){
                tableListaCarrito.innerHTML = html;
            }
        }
    }
}