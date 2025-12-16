<?php
header("Content-Type: application/json");
include "config.php";

$type = $_GET["type"] ?? "";

$map = [
    "product"  => "products",
    "grooming" => "grooming",
    "boarding" => "boarding"
];

if (!isset($map[$type])) {
    echo json_encode([]);
    exit;
}

$table = $map[$type];
$result = mysqli_query($conn, "SELECT id, title, price, img, description FROM $table ORDER BY id DESC");

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        "id"    => $row["id"],
        "title" => $row["title"],
        "price" => (int)$row["price"],
        "img"   => $row["img"],
        "desc"  => $row["description"]
    ];
}

echo json_encode($data);
?>