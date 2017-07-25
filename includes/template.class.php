<?php

class template {

    var $data;

    public function set($name, $value) {
        $this->$name = $value;
    }

    public function assign($name, $value) {
        $this->$name = $value;
    }
    public function display($file) {
        $data = $this->data;
        include($file);
    }

    public function displayNonInclude($file) {
        $data = $this->data;
        ob_start();
        include ($file);
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
    
    public function fetch($file) {
        $data = $this->data;
        ob_start();
        include ($file);
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }

}

?>