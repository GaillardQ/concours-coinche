<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type');

    $fileName = $_POST["fileName"];
    $myFile = "../assets/json/" . $fileName . ".json";
    //try {
        $fh = fopen($myFile, 'w');
        $stringData = $_POST["data"];
        fwrite($fh, $stringData);
        fclose($fh);

        header('Content-Type: application/json');
        echo $stringData;
    //} catch ($e) {
    //    header('HTTP/1.1 500 Internal Server Error');
    //    exit(0);
    //}
?>