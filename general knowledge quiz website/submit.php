<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		http_response_code(405);
		echo 'Method Not Allowed';
		exit;
}

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$score = isset($_POST['score']) ? trim($_POST['score']) : '';

$errors = [];

if ($username === '') {
		$errors[] = 'Name is required.';
} elseif (mb_strlen($username) > 50) {
		$errors[] = 'Name must be 50 characters or fewer.';
}

if ($score === '') {
		$errors[] = 'Score is required.';
} elseif (!is_numeric($score)) {
		$errors[] = 'Score must be a number.';
} else {
		$score = (int)$score;
		if ($score < 0 || $score > 10) $errors[] = 'Score must be between 0 and 10.';
}

if (!empty($errors)) {
		http_response_code(400);
		echo implode(' ', $errors);
		exit;
}
http_response_code(200);
echo 'Valid';
?>
