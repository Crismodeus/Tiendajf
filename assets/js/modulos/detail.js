// const btnAddCart = document.querySelector('#btnAddCart');
// const cantidad = document.querySelector('#product-quanity');
// const id_producto = document.querySelector('#id_producto');

// document.addEventListener("DOMContentLoaded",function() {
//     btnAddCart.addEventListener('click', function () {
//         agregarCarrito(id_producto.value,cantidad.value);
//     })
// })


// Referencias a los elementos
const btnAddCart    = document.querySelector('#btnAddCart');
const cantidad      = document.querySelector('#product-quanity');
const idProducto    = document.querySelector('#id_producto');
const selectMedida  = document.querySelector('#selectMedida');

// Al cargar el DOM
document.addEventListener("DOMContentLoaded", function() {
    // Cuando dan clic en "Agregar"
    if (btnAddCart) {
        btnAddCart.addEventListener('click', function () {
            // 1. Validar si hay una medida seleccionada
            if (selectMedida && !selectMedida.value) {
                Swal.fire("Aviso", "Por favor selecciona una medida", "warning");
                return;
            }

            // 2. Obtener id de producto y cantidad
            const productoId = idProducto.value;
            const cant = parseInt(cantidad.value) || 1;

            // 3. Obtener id_medida y precio
            let medidaId = null;
            let precio   = 0;
            if (selectMedida) {
                const opcion   = selectMedida.options[selectMedida.selectedIndex];
                medidaId       = opcion.value;
                precio         = opcion.getAttribute('data-price');
            }

            // 4. Llamar a la función para agregar al carrito
            //    (puedes definirla aquí mismo o en otro archivo JS que maneje el carrito)
            agregarAlCarrito(productoId, cant, medidaId, precio);
        });
    }
});

function agregarAlCarrito(id_producto, cantidad, id_medida, precio) {
    // Aquí pones tu lógica real de carrito (puede ser sessionStorage/localStorage, etc.)

    // EJEMPLO: 
    // 1) obtener la listaCarrito existente
    let listaCarrito = JSON.parse(sessionStorage.getItem('listaCarrito')) || [];

    // 2) buscar si ya existe el mismo producto+medida
    const index = listaCarrito.findIndex(item =>
        item.id_producto == id_producto && item.id_medida == id_medida
    );

    if (index >= 0) {
        // Si existe, aumentar la cantidad
        listaCarrito[index].cantidad += cantidad;
    } else {
        // Si no existe, agregar un nuevo objeto con todos los campos
        listaCarrito.push({
            id_producto: id_producto,
            cantidad: cantidad,
            id_medida: id_medida,
            precio: precio
        });
    }

    // 3) guardar la lista de nuevo
    sessionStorage.setItem('listaCarrito', JSON.stringify(listaCarrito));

    // 4) mostrar alerta
    Swal.fire("Agregado", "Producto agregado al carrito", "success");
}