<?php
header("Content-Type: application/json; charset=utf-8");
include "config.php";

$username = trim($_POST["username"] ?? "");
$password = trim($_POST["password"] ?? "");

if ($username === "" || $password === "") {
    echo json_encode([
        "status"  => "error",
        "message" => "Username dan password wajib diisi"
    ]);
    exit;
}

// Cek username sudah dipakai atau belum
$stmt = mysqli_prepare($conn, "SELECT id FROM users WHERE username = ?");
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode([
        "status"  => "error",
        "message" => "Username sudah ada"
    ]);
    mysqli_stmt_close($stmt);
    exit;
}
mysqli_stmt_close($stmt);

// Hash password sebelum simpan
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insert user baru
$stmt = mysqli_prepare($conn, "INSERT INTO users (username, password) VALUES (?, ?)");
mysqli_stmt_bind_param($stmt, "ss", $username, $hash);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status"  => "success",
        "message" => "Akun berhasil dibuat"
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "Gagal register: " . mysqli_error($conn)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>