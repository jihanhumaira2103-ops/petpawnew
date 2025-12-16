<?php
header("Content-Type: application/json");
include "config.php";

$type = $_POST["type"] ?? "";
$id   = $_POST["id"]   ?? 0;

$map = [
    "product"  => "products",
    "grooming" => "grooming",
    "boarding" => "boarding"
];

if (!isset($map[$type]) || !$id) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

$table = $map[$type];

$stmt = mysqli_prepare($conn, "DELETE FROM $table WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal hapus"]);
}

mysqli_stmt_close($stmt);
?>
