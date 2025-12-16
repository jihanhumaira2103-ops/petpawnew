<?php
header("Content-Type: application/json; charset=UTF-8");
include "config.php";

$name    = $_POST["name"]    ?? "";
$phone   = $_POST["phone"]   ?? "";
$pet     = $_POST["pet"]     ?? "";
$service = $_POST["service"] ?? "";
$type    = $_POST["type"]    ?? "";
$date    = $_POST["date"]    ?? "";

if ($name === "" || $phone === "" || $pet === "" || $service === "" || $date === "") {
    echo json_encode(["status" => "error", "message" => "Field kosong"]);
    exit;
}

// amankan input
$name    = mysqli_real_escape_string($conn, $name);
$phone   = mysqli_real_escape_string($conn, $phone);
$pet     = mysqli_real_escape_string($conn, $pet);
$service = mysqli_real_escape_string($conn, $service);
$type    = mysqli_real_escape_string($conn, $type);
$date    = mysqli_real_escape_string($conn, $date);

/*
   SESUAIKAN dengan struktur tabel kamu.
   Dari SQL yang kamu kirim sebelumnya, kolomnya kira-kira:
   bookings(
     id,
     customer_name,
     phone,
     pet_name,
     service_type,
     service_name,
     date,
     status,
     created_at
   )
*/

$sql = "INSERT INTO bookings
        (customer_name, phone, pet_name, service_type, service_name, date, status)
        VALUES
        ('$name', '$phone', '$pet', '$type', '$service', '$date', 'pending')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
