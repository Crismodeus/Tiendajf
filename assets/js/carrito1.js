// Obtenemos las listas de botones
const btnAddDeseo = document.querySelectorAll(".btnAddDeseo");
const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnDeseo = document.getElementById("btnCantidadDeseo");
const btnCarrito = document.getElementById("btnCantidadCarrito");
const verCarrito = document.querySelector("#verCarrito");




// Inicializamos las listas
let listaDeseo = [];
let listaCarrito = [];

// Al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
    // Si existe la clave "listaDeseo" en sessionStorage, la parseamos
    if (sessionStorage.getItem("listaDeseo")) {
        listaDeseo = JSON.parse(sessionStorage.getItem("listaDeseo"));
    }

    // Si existe la clave "listaCarrito" en sessionStorage, la parseamos
    if (sessionStorage.getItem("listaCarrito")) {
        listaCarrito = JSON.parse(sessionStorage.getItem("listaCarrito"));
    }

    // Asignamos eventos a los botones de "Agregar a Deseos"
    for (let i = 0; i < btnAddDeseo.length; i++) {
        btnAddDeseo[i].addEventListener("click", function () {
            let id_producto = btnAddDeseo[i].getAttribute("prod");
            agregarDeseo(id_producto); // Función que no muestras en tu snippet, pero supongo que implementas similar a agregarCarrito
        });
    }

    // Asignamos eventos a los botones de "Agregar a Carrito"
    for (let i = 0; i < btnAddCarrito.length; i++) {
        btnAddCarrito[i].addEventListener("click", function () {
            let id_producto = btnAddCarrito[i].getAttribute("prod");
            agregarCarrito(id_producto, 1);
        });
    }

    // Mostramos la cantidad inicial de items
    cantidadDeseo();
    cantidadCarrito();

    //Ver carrito
    const myModal = new bootstrap.Modal(document.getElementById('myModal'))
    verCarrito.addEventListener('click',function(){
        myModal.show();
    })
});

// Actualiza el número en el ícono de deseos
function cantidadDeseo() {
    // listaDeseo ya está cargada en memoria
    if (listaDeseo && btnDeseo) {
        btnDeseo.textContent = listaDeseo.length;
    }
}

// Actualiza el número en el ícono de carrito
function cantidadCarrito() {
    // listaCarrito ya está cargada en memoria
    if (listaCarrito && btnCarrito) {
        btnCarrito.textContent = listaCarrito.length;
    } else {
        btnCarrito.textContent = 0;
        listaCarrito.textContent = 0;
    }

}

// Agrega productos al carrito
function agregarCarrito(id_producto, cantidad) {
    // Verificamos si el producto ya existe en listaCarrito
    for (let i = 0; i < listaCarrito.length; i++) {
        if (listaCarrito[i]["id_producto"] == id_producto) {
            // Producto ya está en el carrito
            Swal.fire("Aviso?", "El producto ya está agregado", "warning");
            return;
        }
    }
    // Si llegamos aquí, el producto NO existe, lo agregamos
    listaCarrito.push({
        id_producto: id_producto,
        cantidad: cantidad,
    });
    // Guardamos en sessionStorage
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
    Swal.fire("Aviso?", "Producto agregado al carrito", "success");

    // Actualizamos contador
    cantidadCarrito();
}

//Eliminar elementos de carrito
function btnEliminarCarrito() {
    let listaEliminar = document.querySelectorAll('btnEliminarCarrito')
}

const tablaLista = document.querySelector("#tablaListaCarrito tbody");
document.addEventListener("DOMContentLoaded", function(){
    getListaCarrito();
});

function getListaCarrito(){
    const url = base_url + 'principal/getListaCarrito';
    const http = new XMLHttpRequest();
    http.open('POST',url,true);
    http.send(JSON.stringify(listaCarrito));
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            let html = '';
            res.productos.array.forEach(producto => {
                html += `<tr>
                    <td>
                        <img class= "img-thumbnail rounded-circle" src="${producto,imagen_producto}" alt"" ;
                    </td>
                    <td>${producto,nombre_producto}</td>
                    <td>${producto,costo_producto}</td>
                    <td>${producto,cantidad}</td>
                    <td>Total</td>
                    <td><button class="btn btn-danger" type="button">Eliminar</button></td>
                </tr>`;
            });
            tablaLista.innerHTML = html;
        }
    }
}
