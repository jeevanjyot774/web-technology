<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST">
    <input type="number" name="num" placeholder="Enter a number">
    <button type="submit">Check</button>
</form>

<?php
if (isset($_POST['num'])) {
    $number = $_POST['num'];
    $isPrime = true;
    
    if ($number <= 1) {
        $isPrime = false;
    } else {
        for ($i = 2; $i <= sqrt($number); $i++) {
            if ($number % $i == 0) {
                $isPrime = false;
                break;
            }
        }
    }
    
    if ($isPrime) {
        echo "$number is a Prime Number";
    } else {
        echo "$number is Not a Prime Number";
    }
}
?>
</body>
</html>