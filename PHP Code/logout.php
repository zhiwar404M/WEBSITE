<?php
session_start();
session_destroy();
header("Location: index.html");  // بگەڕێنەوە بۆ پەڕەی سەرەکی
exit();
?>
