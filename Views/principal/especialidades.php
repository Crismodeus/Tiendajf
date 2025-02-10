<?php include_once 'Views/template-principal/header.php';

?>
    <!-- Start Content -->
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-3">
                <h1 class="h2 pb-4">Productos</h1>
            </div>
                <div class="row">
                    <?php foreach ($data['productos'] as $producto){ ?>
                    <div class="col-md-3">
                        <div class="card mb-4 product-wap rounded-0">
                            <div class="card rounded-0">
                                <img class="card-img rounded-0 img-fluid" src="<?php echo $producto['imagen_producto'];?>">
                                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul class = "list-unstyled">
                                        <li>
                                            <a class="btn btn-util text-white mt-2 btnAddCarrito" href="#" prod="<?php echo $producto['id_producto']; ?>"><i class="fas fa-cart-plus"></i>
                                        </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <a href="shop-single.html" class="h3 text-decoration-none"><?php echo $producto['nombre_producto'];?></a>
                                <!-- hacer foreach para mostrar varias medidas del producto y varios precios -->
                                <p class="text-center mb-0"><?php echo $producto['medida_producto'];?></p>
                                <!-- <p class="text-center mb-0"><?php echo MONEDA .' '. $producto['costo_producto'];?></p> -->
                            </div>
                            
                        </div>
                    </div>
                    <?php } ?>  
                </div>
                <div class="row">
                <!-- Paginación Productos -->
                    <ul class="pagination pagination-lg justify-content-end">
                        <?php 
                            $anterior = $data['pagina'] - 1;
                            $siguiente = $data['pagina'] + 1;
                            $url = BASE_URL . 'principal/especialidades/' . $data['id_especialidad'];

                            // Botón "Anterior"
                            if ($data['pagina'] > 1) {
                                echo '<li class="page-item">
                                        <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-white"
                                        href="' . $url . '/' . $anterior . '">Anterior</a>
                                    </li>';
                            }

                            // Botón "Siguiente"
                            if ($data['total'] >= $siguiente) {
                                echo '<li class="page-item">
                                        <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-white"
                                        href="' . $url . '/' . $siguiente . '">Siguiente</a>
                                    </li>';
                            }
                        ?>
                    </ul>
            </div>
        </div>
    </div>
    <!-- End Content -->

    <?php include_once 'Views/template-principal/footer.php'; ?>

    <!-- Start Script -->
    <script src="<?php echo BASE_URL; ?>assets/js/jquery-1.11.0.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/jquery-migrate-1.2.1.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/templatemo.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/custom.js"></script>
    <script src="<?php echo BASE_URL; ?>assets/js/sweetalert2.all.min.js"></script>
    <!-- End Script -->
</body>

</html>