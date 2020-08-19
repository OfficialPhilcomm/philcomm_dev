<?php
include 'general.php';

// curl -H "API-Token: test" -H "Auth-Token: 0357625e-e205-11ea-af0d-001a4a150180" https://philcomm.dev/servicemarket/api/api_key_test.php

requireLogin();

echo "User ID: ".getUserID();