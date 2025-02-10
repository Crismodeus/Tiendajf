<?php
class PrincipalModel extends Query{
 
    public function __construct()
    {
        parent::__construct();
 
    }
    public function getProductoEspecialidad($id_especialidad)
    {
        $sql = "SELECT * FROM productos_especialidades WHERE id_especialidad = $id_especialidad";
        return $this->selectAll($sql);
    }

    public function getProductoEspec1($id_especialidad)
{
    $sql = "SELECT p.* FROM productos_especialidades AS pe
            INNER JOIN productos AS p ON p.id_producto = pe.id_producto
            -- INNER JOIN producto_medidas pm ON pm.id_producto = p.id_producto
            WHERE pe.id_especialidad = $id_especialidad";
    return $this->select($sql);
}
//Detalle Detail
public function getProducto($id_producto)
{
    // Supongamos que tomas la primer medida
    $sql = "SELECT p.*, pm.costo_producto FROM productos p LEFT JOIN producto_medidas pm ON p.id_producto = pm.id_producto
            WHERE p.id_producto = $id_producto LIMIT 1";
    return $this->select($sql, [$id_producto]);
}

    //paginación Shop
    public function getProductos($desde, $porPagina)
    {
        $sql = "SELECT p.id_producto,
                    p.nombre_producto,
                    p.imagen_producto,

                    GROUP_CONCAT(pm.nombre_medida SEPARATOR ' / ') AS medidas_producto,

                    GROUP_CONCAT(pm.costo_producto SEPARATOR ' / ') AS costos_producto
                    
                FROM productos p
                LEFT JOIN producto_medidas pm ON p.id_producto = pm.id_producto
                GROUP BY p.id_producto
                ORDER BY p.id_producto DESC
                LIMIT $desde, $porPagina";

        return $this->selectAll($sql);
    }

    public function getEspecialidad() {
        $sql = "SELECT * FROM especialidades ORDER BY nombre_especialidad ASC";
        return $this->selectAll($sql);    
    }
    

    //Obtener medidas por producto
    public function getMedidas($id_producto)
    {
        $sql = "SELECT id_producto_medida, nombre_medida, costo_producto
        FROM producto_medidas
        WHERE id_producto = $id_producto";
        return $this->selectAll($sql, [$id_producto]);
    }

    //Número de páginas de Productos
    public function getTotalProductos() {
        $sql = "SELECT COUNT(*) AS total FROM productos";
        return $this->select($sql);    
    }
    
    //Número de páginas de Productos por Especialidad
    public function getTotalProductosEsp($id_especialidad,$desde,$porpagina) {
        $sql = "SELECT COUNT(*) AS total FROM productos_especialidades WHERE id_especialidad = $id_especialidad LIMIT $desde, $porpagina";
        return $this->select($sql);
    }

    //Obtener productos Lista Carrito
    public function getListaCarrito($id_producto){
        $sql = "SELECT * FROM productos WHERE id_producto = $id_producto";
        return $this->select($sql);
    }

}
?>