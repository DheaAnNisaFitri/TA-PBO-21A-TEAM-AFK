// login.js

// Menambahkan event listener pada form login
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah pengiriman form dan reload halaman

  // Mendapatkan nilai dari input username dan password
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Implementasi validasi login sesuai kebutuhan

  // Contoh sederhana: jika login berhasil, arahkan ke halaman peminjaman buku
  if (username === "admin" && password === "admin") {
    window.location.href = "index.html"; // Mengarahkan ke halaman peminjaman buku
  } else {
    alert("Login gagal. Silakan coba lagi."); // Menampilkan alert jika login gagal
  }
});
