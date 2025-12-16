<?php
header("Content-Type: application/json");
include "config.php";

$result = mysqli_query(
    $conn,
    "SELECT id, customer_name, phone, address, items_json, total,
            status, delivery_date, created_at
     FROM orders
     ORDER BY created_at DESC"
);

$data = [];
while($row = mysqli_fetch_assoc($result)){
    $row["total"] = (int)$row["total"];
    $data[] = $row;
}
echo json_encode($data);
?>
