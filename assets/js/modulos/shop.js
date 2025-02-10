// shop.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar TODOS los selects de medida
    const selectsMedida = document.querySelectorAll('.selectMedida');
    selectsMedida.forEach((sel) => {
      sel.addEventListener('change', function() {
        // Al cambiar, obtener la opción elegida
        const opcion = this.options[this.selectedIndex];
        const price = opcion.getAttribute('data-price');
  
        // Buscar en el contenedor actual el span.precioSel
        const cardBody = this.closest('.card-body');
        const precioSel = cardBody.querySelector('.precioSel');
        if (precioSel) {
          precioSel.textContent = 'Precio: $ ' + price;
        }
      });
    });
  
    // 2. Manejo de “Agregar al Carrito”
    const btnAddCarritos = document.querySelectorAll('.btnAddCarrito');
    btnAddCarritos.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const idProd = this.getAttribute('data-prod');
        // Encontrar el select de medida asociado a este producto
        const cardBody = this.closest('.product-wap'); // o .card-body
        const sel = cardBody.querySelector('.selectMedida');
  
        if (sel && sel.value) {
          // Opción seleccionada
          const opcion = sel.options[sel.selectedIndex];
          const idMedida = opcion.value;
          const precio = opcion.getAttribute('data-price');
  
          // Lógica para guardar en el carrito
          // EJEMPLO:
          agregarCarrito(idProd, idMedida, precio);
        } else {
          Swal.fire("Aviso", "Por favor seleccione una medida", "warning");
        }
      });
    });
  });
  
  function agregarCarrito(id_producto, id_medida, precio) {
    // Tu lógica de almacenamiento, p.ej. en sessionStorage
    let listaCarrito = JSON.parse(sessionStorage.getItem('listaCarrito')) || [];
  
    // Verificar si ya existe (producto + medida)
    const index = listaCarrito.findIndex(
      (item) => item.id_producto == id_producto && item.id_medida == id_medida
    );
    if (index >= 0) {
      // Ya existe => incrementar la cantidad (ej. +1)
      listaCarrito[index].cantidad++;
    } else {
      // No existe => agregar objeto
      listaCarrito.push({
        id_producto,
        id_medida,
        precio,
        cantidad: 1,
      });
    }
  
    sessionStorage.setItem('listaCarrito', JSON.stringify(listaCarrito));
    Swal.fire("Agregado", "Producto agregado al carrito", "success");
  }
  