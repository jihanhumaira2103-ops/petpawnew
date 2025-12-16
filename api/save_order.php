<?php
header("Content-Type: application/json");
include "config.php";

$name    = $_POST["name"] ?? "";
$phone   = $_POST["phone"] ?? "";
$address = $_POST["address"] ?? "";
$items   = $_POST["items"] ?? "[]";
$total   = $_POST["total"] ?? 0;

if ($name === "" || $phone === "" || $address === "") {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO orders (customer_name, phone, address, items_json, total)
     VALUES (?, ?, ?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, "ssssi", $name, $phone, $address, $items, $total);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success", "order_id" => mysqli_insert_id($conn)]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal menyimpan pesanan"]);
}

mysqli_stmt_close($stmt);
?>
