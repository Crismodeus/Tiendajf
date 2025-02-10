<?php
class HomeModel extends Query{
 
    public function __construct()
    {
        parent::__construct();
    }
    public function getEspecialidad() {
        $sql = "SELECT * FROM especialidades ORDER BY nombre_especialidad ASC";
        $this->selectAll($sql);
        return $this->selectAll($sql);    
    }

}
 
?>