<?php
header("Content-Type: application/json; charset=utf-8");
require "config.php";

$title = $_POST["title"] ?? "";
$price = (int)($_POST["price"] ?? 0);
$desc  = $_POST["description"] ?? "";
$type  = $_POST["type"] ?? "product";   // product | grooming | boarding

if ($title === "" || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Nama atau harga belum diisi"]);
    exit;
}

/* tentukan nama tabel dari kategori */
switch ($type) {
    case "product":
        $table = "products";
        break;
    case "grooming":
        $table = "grooming";
        break;
    case "boarding":
        $table = "boarding";
        break;
    default:
        echo json_encode(["status" => "error", "message" => "Kategori tidak valid"]);
        exit;
}

/* =========================
   Upload gambar
   ========================= */
$imgPath = "";   // path yang nanti disimpan ke DB (mis: ../images/namafile.jpg)

if (!empty($_FILES["image"]["name"])) {
    $uploadDir = "../images/";                // folder gambar kamu
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext      = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
    $filename = "item_" . time() . "_" . rand(1000, 9999) . "." . $ext;
    $target   = $uploadDir . $filename;

    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target)) {
        echo json_encode(["status" => "error", "message" => "Gagal upload gambar"]);
        exit;
    }

    // path relatif yang dipakai di front-end
    $imgPath = "../images/" . $filename;
}

/* kalau tidak upload file, boleh pakai fallback dari input url (opsional) */
if ($imgPath === "" && !empty($_POST["img_url"])) {
    $imgPath = $_POST["img_url"];
}

/* =========================
   Simpan ke database
   ========================= */
$stmt = $conn->prepare("
    INSERT INTO $table (title, price, img, description)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("siss", $title, $price, $imgPath, $desc);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Item berhasil ditambahkan"]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "DB error: " . $conn->error
    ]);
}
