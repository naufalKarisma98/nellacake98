let pesanan = [];
let totalHarga = 0;

function pesan(nama, harga) {
  pesanan.push({ nama, harga });
  totalHarga += harga;
  updateOrderList();
  updateCartCount(); // <== tambahkan ini
}

function updateOrderList() {
  const orderList = document.getElementById('order-list');
  const total = document.getElementById('total');
  orderList.innerHTML = '';

  pesanan.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} - Rp${item.harga.toLocaleString()}`;
    orderList.appendChild(li);
  });

  total.textContent = `Total: Rp${totalHarga.toLocaleString()}`;
}

function checkout() {
  if (pesanan.length === 0) {
    alert("Kamu belum memesan apa pun!");
    return;
  }

  const metode = document.querySelector('input[name="metode"]:checked').value;
  const noWA = "6285814198126"; // GANTI DENGAN NOMOR WA KAMU

  let pesanWA = "*Pesanan dari Roti Bakar 88:*\n\n";
  pesanan.forEach(item => {
    pesanWA += `- ${item.nama} (Rp${item.harga.toLocaleString()})\n`;
  });
  pesanWA += `\n*Total:* Rp${totalHarga.toLocaleString()}`;
  pesanWA += `\n*Metode Pembayaran:* ${metode}`;

  if (metode === "Rekening Bank") {
    pesanWA += `\n\nSilakan transfer ke:\n*1234567890 (BCA a.n. Roti Bakar 88)*`;
  }

  // Encode pesan & buat link
  const url = `https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`;

  // Redirect ke WhatsApp
  window.open(url, "_blank");

  // Reset pesanan & tampilan
  pesanan = [];
  totalHarga = 0;
  updateOrderList();
  updateCartCount();

  // QR muncul (opsional, bisa dihilangkan kalau mau WA-only)
  const qrContainer = document.getElementById('qr-container');
  const qrImage = document.getElementById('qr-image');
  const rekeningInfo = document.getElementById('rekening-info');

  if (metode === "DANA") {
    qrImage.src = "images/qr-dana.png";
    rekeningInfo.style.display = "none";
  } else if (metode === "OVO") {
    qrImage.src = "images/qr-ovo.png";
    rekeningInfo.style.display = "none";
  } else {
    qrImage.src = "images/qr-bank.png";
    rekeningInfo.style.display = "block";
  }

  qrContainer.style.display = "block";
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = pesanan.length;
}
function batalPesanan() {
  if (pesanan.length === 0) {
    alert("Tidak ada pesanan untuk dibatalkan.");
    return;
  }

  if (confirm("Apakah kamu yakin ingin membatalkan semua pesanan?")) {
    pesanan = [];
    totalHarga = 0;
    updateOrderList();
    updateCartCount();
    alert("Pesanan telah dibatalkan.");
  }
}

// Login admin
function loginAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "admin88") {
    document.getElementById("admin-panel").style.display = "block";
    alert("Login berhasil. Silakan tambah menu.");
  } else {
    alert("Password salah.");
  }
}

// Fungsi login admin
function loginAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "admin88") {
    document.getElementById("admin-panel").style.display = "block"; // tampilkan panel admin
  } else {
    alert("Password salah.");
  }
}

// Fungsi untuk menampilkan form tambah menu
function showFormTambah() {
  document.getElementById("form-tambah").style.display = "block"; // tampilkan form
}

// Fungsi untuk menambah menu
function tambahMenu() {
  const nama = document.getElementById("nama-menu").value.trim();
  const harga = parseInt(document.getElementById("harga-menu").value);
  const gambar = document.getElementById("gambar-menu").value.trim();

  if (!nama || isNaN(harga)) {
    alert("Nama dan harga wajib diisi!");
    return;
  }

  // Menambahkan menu ke daftar menu utama
  const daftarMenu = document.getElementById("daftar-menu");

  const col = document.createElement("div");
  col.className = "col-md-4 mb-3";
  col.innerHTML = `
    <div class="card h-100">
      ${gambar ? `<img src="${gambar}" class="card-img-top" alt="${nama}">` : ''}
      <div class="card-body text-center">
        <h5 class="card-title">${nama}</h5>
        <p class="card-text">Rp${harga.toLocaleString()}</p>
        <button class="btn btn-primary" onclick="alert('Pesan ${nama} - Rp${harga.toLocaleString()}')">Pesan Sekarang</button>
      </div>
    </div>
  `;

  daftarMenu.appendChild(col);
  document.getElementById("form-tambah").reset(); // reset form
  document.getElementById("form-tambah").style.display = "none"; // sembunyikan form
  alert(`Menu "${nama}" berhasil ditambahkan ke daftar!`);
}
