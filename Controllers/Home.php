<?php
class Home extends Controller
{
    public function __construct() {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'Pagina Principal';
        $data['especialidades'] = $this->model->getEspecialidad();
        $this->views->getView('home', "index", $data);
    }

}