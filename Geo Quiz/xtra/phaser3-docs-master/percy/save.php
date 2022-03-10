<?php
    $querypath = $_POST['filename'];

    $savepath = 'D:\wamp\www\phaser\src\\' . $_POST['filename'];

    $file_db = new PDO('sqlite:D:/wamp/www/phaser3-docs/percy/files.db');

    $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $update = "UPDATE files SET done=1 WHERE path = :path";

    $stmt = $file_db->prepare($update);

    $stmt->bindParam(':path', $querypath, PDO::PARAM_STR);

    $stmt->execute();

    $file_db = null;

    //  Save file too
    file_put_contents($savepath, $_POST['src']);

    echo 'OK';
?>