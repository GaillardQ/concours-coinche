<?php
    $myFile = "public/json/game.json";
    $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = $_POST["data"];
    fwrite($fh, $stringData);
    fclose($fh);

    header('Content-Type: application/json');
    echo $stringData;
?>