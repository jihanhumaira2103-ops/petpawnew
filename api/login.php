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

// Ambil user berdasarkan username
$stmt = mysqli_prepare($conn, "SELECT id, username, password FROM users WHERE username = ?");
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

if (!$user) {
    echo json_encode([
        "status"  => "error",
        "message" => "User tidak ditemukan"
    ]);
    exit;
}

// password di DB = hash (password_hash)
$hashFromDb = $user["password"];

// dukung 2 tipe: hash & plain text (kalau ada user lama)
$isValid = password_verify($password, $hashFromDb) || $password === $hashFromDb;

if ($isValid) {
    echo json_encode([
        "status"  => "success",
        "message" => "Login berhasil",
        "user"    => [
            "id"       => $user["id"],
            "username" => $user["username"]
        ]
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "Password salah"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
