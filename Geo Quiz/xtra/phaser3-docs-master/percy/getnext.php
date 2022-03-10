<?php
    $querypath = $_POST['filename'];

    $file_db = new PDO('sqlite:D:/wamp/www/phaser3-docs/percy/files.db');

    $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $select = "SELECT id FROM files WHERE files.path = :path";

    $stmt = $file_db->prepare($select);

    $stmt->bindParam(':path', $querypath, PDO::PARAM_STR);

    $stmt->execute();

    $result = $stmt->fetchObject()->id;

    if ($result)
    {
        $id = (int) $result;
        $id++;

        $select = "SELECT path FROM files WHERE id = :id";

        $stmt = $file_db->prepare($select);

        $stmt->bindParam(':id', $id);

        $stmt->execute();

        $result = $stmt->fetchObject()->path;

        echo $result;
    }
    else
    {
        echo '';
    }

    $file_db = null;
?>