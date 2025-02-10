<?php
class Principal extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = '';
        $this->views->getView('principal', "index", $data);
    }

    //vista acerca de
    public function about()
    {
        $data['title'] = 'Acerca de';
        $this->views->getView('principal', "about", $data);
    }

    //vista Productos
    public function detail($id_producto)
    {
        $data['producto'] = $this->model->getProducto($id_producto);
        $data['title'] = 'Nuestros Productos';
        $this->views->getView('principal', "detail", $data);
    }


      //vista Productos-Especialidades
      public function especialidades($datos)
      {
        $array = explode(',',$datos);
        if(isset($array[0])) {
            if (!empty($array[0])) {
                $id_especialidad = $array[0];
            }
        }

        $array = explode(',',$datos);
        if(isset($array[1])) {
            if (!empty($array[1])) {
                $page = $array[1];
            }
        }
        $pagina = (empty($page)) ? 1 : $page ;
        $porpagina=12;
        $desde=($pagina - 1)* $porpagina;

        
        $data['pagina']=$pagina;
        $paginas = $this->model->getTotalProductosEsp($id_especialidad,$desde,$porpagina);
        $data['total'] = ceil($paginas['total'] / $porpagina);


        $data['productos'] = $this->model->getProductoEspec1($id_especialidad);
        $data['title'] = 'Categorias';
        $data['id_especialidad'] = $id_especialidad;
        $this->views->getView('principal', "especialidades", $data);
      }

    //vista Tienda
    public function shop($page)
    {
        $pagina = (empty($page)) ? 1 : $page ;
        $porpagina=30;
        $desde=($pagina - 1)* $porpagina;

        $data['title'] = 'Nuestros Productos';
        $data['productos'] = $this->model->getProductos($desde,$porpagina);
        $data['especialidad'] = $this->model->getEspecialidad();
        $data['pagina']=$pagina;
        $paginas = $this->model->getTotalProductos();
        $data['total'] = ceil($paginas['total'] / $porpagina);
        $this->views->getView('principal', "shop", $data);
    }

    //vista Contacto
    public function contactos()
    {
        $data['title'] = 'Contactanos';
        $this->views->getView('principal', "contact", $data);
    }

    //Obtener productos Lista Carrito
    public function getListaCarrito(){
        $datos = file_get_contents('php://input');
        $json = json_decode($datos,true);
        $array = array();

        foreach ($json as $producto) {
            $result =$this->model->getListaCarrito($producto['id_producto']);
            $data['id_producto'] = $result['id_producto'];
            $data['nombre_producto'] = $result['nombre_producto'];
            $data['costo_producto'] = $result['costo_producto'];
            $data['imagen_producto'] = $result['imagen_producto'];
            $data['cantidad'] = $producto['cantidad'];
            array_push($array, $data);
        }
        echo json_encode($array, JSON_UNESCAPED_UNICODE);
        die();
    }
}