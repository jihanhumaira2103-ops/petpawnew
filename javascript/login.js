function login() {
    let user = document.getElementById("username").value;
    let pw = document.getElementById("password").value;

    if (!user || !pw) {
        alert("Isi username dan password!");
        return;
    }

    let formData = new FormData();
    formData.append("username", user);
    formData.append("password", pw);

    fetch("../api/login.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {

            // --- PENTING: SIMPAN SESSION ---
            localStorage.setItem("petpaw_session", JSON.stringify({
                username: user,
                name: user
            }));

            alert("Login berhasil!");
            window.location.href = "index.html"; 
        } else {
            alert(data.message || "Username atau password salah!");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Terjadi error pada server");
    });
}
