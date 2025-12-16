function register() {
    let user = document.getElementById("username").value;
    let pw = document.getElementById("password").value;

    if (user === "" || pw === "") {
        alert("Isi username dan password!");
        return;
    }

    let formData = new FormData();
    formData.append("username", user);
    formData.append("password", pw);

    // register.php ada di folder /api, sedangkan register.html ada di /html
    fetch("../api/register.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("Akun berhasil dibuat! Silakan login.");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registrasi gagal");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Terjadi error pada server");
    });
}
