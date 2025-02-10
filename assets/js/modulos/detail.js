const btnAddCart = document.querySelector('#btnAddCart');
const cantidad = document.querySelector('#product-quanity');
const id_producto = document.querySelector('#id_producto');

document.addEventListener("DOMContentLoaded",function() {
    btnAddCart.addEventListener('click', function () {
        agregarCarrito(id_producto.value,cantidad.value);
    })
})
