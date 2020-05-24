<?php
// First of all send css header
header("Content-type: text/css");

// Array of css files
$css = array(
    'master.css',
    'order-box.css',
    'popup.css'
);

// Prevent a notice
$css_content = '';

// Loop the css Array
foreach ($css as $css_file) {
    // Load the content of the css file
    $css_content .= file_get_contents($css_file);
}

// print the css content
echo $css_content;
