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
    $sql = "SELECT p.*
            FROM productos_especialidades AS pe
            INNER JOIN productos AS p ON p.id_producto = pe.id_producto
            -- INNER JOIN producto_medidas pm ON pm.id_producto = p.id_producto
            WHERE pe.id_especialidad = $id_especialidad";
    return $this->selectAll($sql);
}

    public function getProducto($id_producto)
    {
        $sql = "SELECT * FROM productos WHERE id_producto=$id_producto";
        return $this->select($sql);
    }

    //paginación
    public function getProductos($desde,$porpagina)
    {
        $sql = "SELECT * FROM productos LIMIT $desde, $porpagina";
        return $this->selectall($sql);
    }
    public function getEspecialidad() {
        $sql = "SELECT * FROM especialidades ORDER BY nombre_especialidad ASC";
        return $this->selectAll($sql);    
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