<?php
header("Content-Type: application/json");
include "config.php";

$id     = $_POST["id"] ?? 0;
$status = $_POST["status"] ?? "";
$date   = $_POST["delivery_date"] ?? null;

if(!$id || $status===""){
    echo json_encode(["status"=>"error","message"=>"Data tidak lengkap"]);
    exit;
}

$stmt = mysqli_prepare(
  $conn,
  "UPDATE orders SET status=?, delivery_date=? WHERE id=?"
);
mysqli_stmt_bind_param($stmt, "ssi", $status, $date, $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Gagal update"]);
}
mysqli_stmt_close($stmt);
?>
