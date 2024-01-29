// login.js

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Validasi kredensial pengguna (contoh sederhana)
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Implementasi validasi login sesuai kebutuhan

    // Contoh sederhana: jika login berhasil, arahkan ke halaman peminjaman buku
    if (username === "admin" && password === "admin") {
      window.location.href = "index.html";
    } else {
      alert("Login gagal. Silakan coba lagi.");
    }
  });
