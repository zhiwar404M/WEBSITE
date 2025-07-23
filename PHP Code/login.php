<?php
session_start();

// نموونەی بەکارهێنەران (لە ڕاستیدا پێویستە لە بنکەدراوە وەربگیرێت)
$users = [
    "admin@example.com" => password_hash("password123", PASSWORD_BCRYPT),
    "user@example.com" => password_hash("userpass", PASSWORD_BCRYPT)
];

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) {
    die("تکایە ئیمەیڵ بنووسە!");
}

if (empty($password)) {
    die("تکایە وشەی نهێنی بنووسە!");
}

// پشکنینی ئیمەیڵ و وشەی نهێنی
if (isset($users[$email]) {
    if (password_verify($password, $users[$email])) {
        $_SESSION['user_email'] = $email;
        header("Location: dashboard.php");  // بڕۆ بۆ پەڕەی داشبۆرد
        exit();
    } else {
        die("وشەی نهێنی هەڵەیە!");
    }
} else {
    die("ئیمەیڵەکە بوونی نییە!");
}
?>
