const btnAddDeseo = document.querySelectorAll(".btnAddDeseo");
const btnAddCarrito = document.querySelectorAll(".btnAddCarrito");
const btnDeseo = document.querySelectorAll("#btnCantidadDeseo");
const btnCarrito = document.querySelectorAll("#btnCantidadCarrito");
let listaDeseo;
let listaCarrito;


document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("listaDeseo") != null) {
        listaDeseo = JSON.parse(localStorage.getItem("listaDeseo"));
    }

    if (localStorage.getItem("listaCarrito") != null) {
        listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    }

    for (let i = 0; i < btnAddDeseo.lenght; i++) {
        btnAddDeseo[i].addEventListener("click", function () {
            let id_producto = btnAddDeseo[i].getAttribute("prod");
            agregarDeseo(id_producto);
        })
    }
    for (let i = 0; i < btnAddCarrito.length; i++) {
        btnAddCarrito[i].addEventListener("click", function () {
            let id_producto = btnAddCarrito[i].getAttribute("prod");
            agregarCarrito(id_producto, 1);
        });
    }
    cantidadDeseo();
    cantidadCarrito();
})

function cantidadDeseo() {
    let listas = JSON.parse(localStorage.getItem("listaDeseo"));
    if (listas != null) {
        btnDeseo.textContent = listas.lenght;
    } else {
        btnDeseo.textContent = 0;
    }
}

function cantidadCarrito() {
    let listas = JSON.parse(localStorage.getItem("listaCarrito"));
    if (listas != null) {
        btnCarrito.textContent = listas.length;
    } else {
        btnCarrito.textContent = 0;
    }
}

//agregar productos al carrito
function agregarCarrito(id_producto, cantidad) {
    // console.log(localStorage.getItem("listaCarrito"));
    // return;
    if (localStorage.getItem("listaCarrito") == null) {
        listaCarrito = [];
    } else {
        let listaExiste = JSON.parse(localStorage.getItem("listaCarrito"));
        for (let i = 0; i < listaExiste.lenght; i++) {
            if (listaExiste[i]["id_producto"] === id_producto) {
                Swal.fire("Aviso?", "El producto ya está agregado", "warning");
                return;
            }
        }
        listaCarrito.concat(localStorage.getItem("listaCarrito"));
    }
    listaCarrito.push({
        id_producto: id_producto,
        cantidad: cantidad,
    });
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
    Swal.fire("Aviso?", "Producto agregado al carrito", "success");
    cantidadCarrito();
}

