<?php
$conn = new mysqli("localhost", "root", "", "petpaw_db");

if ($conn->connect_error) {
  die("Koneksi database gagal");
}
?>
