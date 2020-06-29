<?php

function print_meta_tags($keywords, $title, $description, $url) {
  $title = "$title | philcomm.dev";

  echo "<title>$title</title>";
  echo "\n";
  echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n";
  echo "<meta name=\"theme-color\" content=\"#10141A\">\n";
  echo "<meta charset=\"utf-8\">\n";
  echo "<meta name=\"description\" content=\"$description\" />\n";
  echo "<meta name=\"keywords\" content=\"$keywords\" />\n";
  echo "<meta property=\"og:title\" content=\"$title\" />\n";
  echo "<meta property=\"og:type\" content=\"website\" />\n";
  echo "<meta property=\"og:url\" content=\"$url\" />\n";
  echo "<meta property=\"og:site_name\" content=\"$title\" />\n";
  echo "<meta property=\"og:description\" content=\"$description\" />\n";
  echo "\n";
  echo "<meta name=\"twitter:card\" content=\"summary_large_image\" />\n";
  echo "<meta name=\"twitter:title\" content=\"$title\" />\n";
  echo "<meta name=\"twitter:description\" content=\"$description\" />\n";
  echo "<meta name=\"twitter:site\" content=\"@dev_philcomm\" />\n";
}
