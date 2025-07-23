<?php
$feedback_type = $_POST['feedback-type'] ?? '';
$message = $_POST['feedback-message'] ?? '';

if (empty($message)) {
    die("تکایە پەیامێک بنووسە!");
}

// ناردنی ئیمەیڵ بە فیدباکەکە (یان خزنەکردنی لە بنکەدراوە)
$to = "zhiwarup@gmail.com";
$subject = "فیدباکی نوێ: $feedback_type";
$headers = "From: feedback@zhiwaryt.com";

if (mail($to, $subject, $message, $headers)) {
    echo "سوپاس بۆ فیدباکەکەت!";
} else {
    echo "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵبدەرەوە.";
}

// یان خزنەکردنی لە فایلێک (feedback.txt)
file_put_contents("feedback.txt", "$feedback_type: $message\n", FILE_APPEND);
?>
