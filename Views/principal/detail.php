<?php include_once 'Views/template-principal/header.php'; ?>
    <!-- Open Content -->
    <section class="bg-light">
        <div class="container pb-5">
            <div class="row">
                <div class="col-lg-5 mt-5">
                    <div class="card mb-3">
                        <img class="card-img img-fluid" src="<?php echo $data['producto']['imagen_producto']; ?>" alt="Card image cap" id="product-detail">
                    </div>
                    
                </div>
                <!-- col end -->
                <div class="col-lg-7 mt-5">
                    <div class="card">
                        <div class="card-body">
                            <h1 class="h2"><?php echo $data['producto']['nombre_producto']; ?></h1>
                            <?php if (!empty($data['medidas'])) { ?>
                                    <hr>
                                    <h5>Selecciona la medida</h5>
                                    <select id="selectMedida" class="form-select w-50">
                                        <option disabled selected>Elige una opción...</option>
                                        <?php foreach ($data['medidas'] as $m) { ?>
                                            <option 
                                            value="<?php echo $m['id_producto_medida']; ?>" 
                                            data-price="<?php echo $m['costo_producto']; ?>">
                                            <?php echo $m['nombre_medida']; ?>
                                            </option>
                                        <?php } ?>
                                    </select>

                                    <div class="mt-3">
                                        <span>Precio: </span>
                                        <strong id="precioMedida">$ 0.00</strong>
                                    </div>
                                <?php } ?>
                            <p class="py-2">
                                <i class="fa fa-star text-warning"></i>
                                <i class="fa fa-star text-warning"></i>
                                <i class="fa fa-star text-warning"></i>
                                <i class="fa fa-star text-warning"></i>
                                <i class="fa fa-star text-secondary"></i>
                            </p>
                            </ul>

                            <h6>Descripción</h6>
                            <p><?php echo $data['producto']['descripcion_producto']; ?></p>
                            
                            </ul>

                            <form action="" method="GET">
                                <input type="hidden" id="id_producto" value="<?php echo $data['producto']['id_producto']; ?>">
                                <div class="row">
                                    <div class="col-auto">

                                    </div>
                                    <div class="col-auto">
                                        <ul class="list-inline pb-3">
                                            <li class="list-inline-item text-right">
                                                Cantidad
                                                <input type="hidden" id="product-quanity" value="1">
                                            </li>
                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-minus">-</span></li>
                                            <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">1</span></li>
                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="row pb-3">
                                    <div class="col d-grid">
                                        <button type="button" class="btn btn-success btn-lg" id="btnAddCart">Agregar</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Close Content -->

    <?php include_once 'Views/template-principal/footer.php'; ?>

    <script src="<?php echo BASE_URL; ?>assets/js/modulos/detail.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/jquery-1.11.0.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/jquery-migrate-1.2.1.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/templatemo.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/custom.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/sweetalert2.all.min.js"></script>

    <!-- Start Slider Script -->

    <script>
        document.addEventListener('DOMContentLoaded', function(){
            const selectMedida = document.getElementById('selectMedida');
            const precioMedida = document.getElementById('precioMedida');

            if (selectMedida) {
                selectMedida.addEventListener('change', function() {
                    const opcion = this.options[this.selectedIndex];
                    const precio = opcion.getAttribute('data-price');
                    precioMedida.textContent = '$ ' + precio;
                });
            }
        });
    </script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const btnMinus = document.getElementById('btn-minus');
            const btnPlus = document.getElementById('btn-plus');
            const varValue = document.getElementById('var-value');
            const productQuantity = document.getElementById('product-quanity');

            // Convertimos la cantidad inicial a número
            let quantity = parseInt(productQuantity.value);

            // Botón menos
            btnMinus.addEventListener('click', function() {
                if (quantity > 1) {
                    quantity -= 1; // Resta de 1
                    varValue.textContent = quantity;
                    productQuantity.value = quantity;
                }
            });

            // Botón más
            btnPlus.addEventListener('click', function() {
                quantity += 1; // Suma de 1
                varValue.textContent = quantity;
                productQuantity.value = quantity;
            });
    });
    </script>
    <script src="<?php echo BASE_URL; ?>assets/js/slick.min.js"></script>
    <script>
        $('#carousel-related-product').slick({
            infinite: true,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 3,
            dots: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3
                    }
                }
            ]
        });
    </script>
    <!-- End Slider Script -->

</body>

</html>