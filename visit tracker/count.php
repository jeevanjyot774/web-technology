
<!DOCTYPE html>
<html>
<head>
    <title>Visitor Counter</title>
</head>
<body>

<h1 align="center">Welcome to Our Website</h1>
<h2 align="center">Visitor Counter</h2>
<?php
function visitorCounter() {
    static $count = 0;
    $count++;
    return $count;
}
$visitors = visitorCounter();
?>
<p align="center">
    Total Number of Visitors:
    <b><?php echo $visitors; ?></b>
</p>
</body>
</html>
