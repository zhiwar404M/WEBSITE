<?php
session_start();
if (!isset($_SESSION['user_email'])) {
    header("Location: index.html");  // بگەڕێنەوە بۆ پەڕەی سەرەکی ئەگەر نەچووبێتە ژوورەوە
    exit();
}
?>
<!DOCTYPE html>
<html lang="ku">
<head>
    <meta charset="UTF-8">
    <title>داشبۆرد | ZHIWAR</title>
</head>
<body>
    <h1>بەخێربێیت <?php echo $_SESSION['user_email']; ?>!</h1>
    <a href="logout.php">چوونەدەرەوە</a>
</body>
</html>
