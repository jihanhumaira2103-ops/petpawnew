<?php
$conn = mysqli_connect("localhost", "root", "", "petpaw");
//         host        user      pass  db
if (!$conn) {
  die("Koneksi gagal: " . mysqli_connect_error());
}

// optional tapi bagus:
mysqli_set_charset($conn, "utf8mb4");
?>
