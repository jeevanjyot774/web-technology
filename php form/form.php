<?php
$name = $_POST['username'];
echo "Submitted Information";
echo "Name: $name";
$file = fopen("data.txt", "a");
fwrite($file, "Name: ".$name);
fclose($file);
echo "Data stored successfully!";
?>
