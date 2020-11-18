<?php


if( ! defined('du')) {
    /**
     * Dump
     *
     * @param mixed $mixed
     */
    function du($mixed)
    {
        echo '<pre>';
        var_dump($mixed);
        echo '</pre>';
    }
}


if( ! defined('dd')) {
    /**
     * Dump and die
     *
     * @param mixed $mixed
     */
    function dd($mixed)
    {
        du($mixed);
        die();
    }
}


if( ! defined('directusMakeTree')) {
    /**
     * Converts filepath flat array to multi-dimensional array
     *
     * @param array $arr
     * @return multitype:unknown |unknown
     */
    function directusMakeTree($arr)
    {
        $part = array_shift($arr);

        if( ! $arr) {
            return [$part];
        }

        $tree[$part] = directusMakeTree($arr);

        return $tree;
    }
}

if( ! defined('directusToUL')) {

    /**
     * Converts multi-dimensional array to htmls list output
     *
     * @param string $data
     * @return string
     */
    function directusToUL($data = false)
    {
        $response = '<ul>';
        if (false !== $data) {
            foreach ($data as $key => $val) {

                $response .= '<li>';

                if (! is_array($val)) {
                    list($fileName, $fileId) = explode(':::', $val);
                    $response .= '<a href="#" id="file-' . $fileId . '" data-id="' . $fileId . '" class="file">' . $fileName . '</a>'
                        .  '<i data-id="' . $fileId . '" class="material-icons delete-file">delete</i>'
                            .  '<i data-id="' . $fileId . '" class="material-icons edit-file">edit</i>';
                }

                else {
                    $response .= $key . ' ' . directusToUL($val);
                }
                $response .= '</li>';
            }
        }
        $response .= '</ul>';
        return $response;
    }
}