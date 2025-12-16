/* =========================
   Data (initial)
   ========================= */
const DEFAULT_PRODUCTS = [
  { id:'p1', title:'Makanan Kucing Royal Soft 2kg', price:85000, img:'../images/makanan_kucing_2kg.png', desc:'Rendah lemak, cocok untuk kucing indoor.'},
  { id:'p2', title:'Makanan Kucing Tuna Crunch 1kg', price:52000, img:'../images/makanan_kucing.png', desc:'Crunchy tuna premium penuh nutrisi.'},
  { id:'p3', title:'Makanan Anjing Adult Salmon 5kg', price:240000, img:'../images/makanan_anjing_adult_salmon.png', desc:'Protein salmon tinggi untuk bulu & kulit.'},
  { id:'p4', title:'Dog Treats Beef Stick 500gr', price:35000, img:'../images/DogTreats.png', desc:'Cemilan sehat untuk anjing dewasa & puppy.'},
  { id:'p5', title:'Pasir Kucing Premium 10L', price:77000, img:'../images/Pasirkucing10L.png', desc:'Pasir Wangi Gumpal, anti bau & hemat'},
  { id:'p6', title:'Shampoo Kucing Chamomile 250ml', price:30000, img:'../images/shampo_kucing.png', desc:'Formula lembut, mengurangi rontok.'},
  { id:'p7', title:'Kalung Anjing Anti Kutu', price:55000, img:'../images/KalungAntiKutu.png', desc:'Perlindungan anjing dari kutu hingga 3 bulan.'},
  { id:'p17',title:'Kalung Kucing Anti Kutu', price:45000, img:'../images/KalungKucingAntiKutu.png', desc:'Melindungi kucing dari kutu hingga 3 bulan.'},
  { id:'p8', title:'Vitamin Multivit Kucing & Anjing', price:45000, img:'../images/vitaminkucing.png', desc:'Meningkatkan nafsu makan & imunitas.'},
  { id:'p9', title:'Vitamin Multivit Anjing', price:55000, img:'../images/vitaminanjing.png', desc:'Meningkatkan nafsu makan & imunitas Anabul.'}, 
  { id:'p14',title:'Drontal Dog 1 Tablet Obat Cacing Anjing', price:13000, img:'../images/Obatcacinganjing.png', desc:'Obat cacing untuk anjing.'},
  { id:'p15',title:'O-Cing Cat 1 Tablet Obat Cacing Kucing', price:12000, img:'../images/Obatcacingkucing.png', desc:'Obat cacing untuk kucing.'},
  { id:'p11',title:'Baju Jas Kucing / Anjing', price:73402, img:'../images/JasHewan.png', desc:'Baju Kondangan Jas Kucing dan Anjing ukuran M - XL.'},
  { id:'p12',title:'Mangkuk Makan Bulat', price:10000, img:'../images/Mangkuk.png', desc:'Mangkuk Ganda 2 in 1 Kucing Anjing Anti Licin Anti Semut.'},
  { id:'p13',title:'Mainan Bola Kucing', price:20000, img:'../images/Mainan_bola.png', desc:'Mainan bola untuk anabul.'},
  { id:'p16',title:'Kandang Lipat Portabel', price:30000, img:'../images/kandang lipat portable.png', desc:'Kandang portabel untuk anabul.'}
];

// helper: load dari localStorage, kalau kosong pakai default dan seed lagi
function loadOrSeed(key, defaults){
  let data = JSON.parse(localStorage.getItem(key) || 'null');
  if (!Array.isArray(data) || data.length === 0) {
    data = defaults.slice();
    localStorage.setItem(key, JSON.stringify(data));
  }
  return data;
}


const DEFAULT_GROOMING = [
  { id:'g1', title:'Grooming Basic', price:70000, img:'../images/BasicGrooming.png', desc:'Mandi, blow, potong kuku, pembersihan telinga.'},
  { id:'g2', title:'Grooming Premium', price:120000, img:'../images/Premiumgrooming.png', desc:'Spa bulu + perawatan kulit + parfum premium.'},
  { id:'g3', title:'Grooming Anti Kutu', price:150000, img:'../images/Groomingkutu.png', desc:'Shampoo anti kutu + treatment anti parasit.'},
  { id:'g4', title:'Grooming Fluffy Care', price:110000, img:'../images/groomingfluf.png', desc:'Untuk bulu panjang, anti kusut + fluffy styling.'},
  { id:'g5', title:'Paket Puppy/Kitten', price:60000, img:'../images/puppykitten.png', desc:'Perawatan khusus bayi hewan, ekstra lembut.'}
];

const DEFAULT_BOARDING = [
  { id:'b1', title:'Penitipan Harian', price:120000, img:'../images/Penitipanharian.png', desc:'Area bermain, update foto harian.'},
  { id:'b2', title:'Penitipan Mingguan', price:700000, img:'../images/PenitipanMingguan.png', desc:'Termasuk makanan & perawatan ringan.'}
];

let currentProductFilter = 'all';

function getProductCategory(item){
  const t = (item.title || '').toLowerCase();

  if (
    t.includes('kalung') ||
    t.includes('sisir') ||
    t.includes('aksesoris') ||
    t.includes('collar') ||
    t.includes('toys') ||
    t.includes('mainan') ||
    t.includes('baju') ||
    t.includes('mangkuk') ||
    t.includes('bola') 
  ){
    return 'aksesoris';
  }

  if (t.includes('kucing')) return 'kucing';
  if (t.includes('anjing') || t.includes('dog')) return 'anjing';

  return 'aksesoris';
}



function renderProducts(){
  const pg = document.getElementById('productsGrid');
  pg.innerHTML = "";

  let list = PRODUCTS;
  if (currentProductFilter !== 'all') {
    list = PRODUCTS.filter(p => getProductCategory(p) === currentProductFilter);
  }

  list.forEach(p => pg.appendChild(createCard(p,'product')));
}

function filterProducts(cat){
  currentProductFilter = cat;

  renderProducts();

  document.querySelectorAll("[data-filter-cat]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filterCat === cat);
  });
}


/// async function loadDataFromAPI(){
 /* try { 
    const [resP, resG, resB] = await Promise.all([
      fetch("../api/get_items.php?type=product"),
      fetch("../api/get_items.php?type=grooming"),
      fetch("../api/get_items.php?type=boarding")
    ]);

    PRODUCTS = await resP.json();
    GROOMING = await resG.json();
    BOARDING = await resB.json();

    renderAll();
  } catch (err) {
    console.error("Gagal load data dari API:", err);
    alert("Gagal mengambil data produk/grooming dari server");
  }
}

async function loadDataFromAPI(){
  try {
    const [resP, resG, resB] = await Promise.all([
      fetch("../api/get_items.php?type=product"),
      fetch("../api/get_items.php?type=grooming"),
      fetch("../api/get_items.php?type=boarding")
    ]);

    PRODUCTS = await resP.json();
    GROOMING = await resG.json();
    BOARDING = await resB.json();

    renderAll();
  } catch (err) {
    console.error("Gagal load data dari API:", err);
    alert("Gagal mengambil data produk/grooming dari server");
  }
}
///


/* helper: gabungkan data default + data yang sudah ada di localStorage */
/* function mergeWithDefaults(key, defaults){
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key) || '[]');
  } catch(e){
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  const ids = new Set(data.map(it => it && it.id));
  defaults.forEach(def => {
    if (!ids.has(def.id)) {
      data.unshift(def);      // tambahkan default kalau belum ada
    }
  });

  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

/// load data (selalu pastikan default ikut masuk) */
let PRODUCTS  = DEFAULT_PRODUCTS.slice();
let GROOMING  = DEFAULT_GROOMING.slice();
let BOARDING  = DEFAULT_BOARDING.slice();

/* CART */
let CART = JSON.parse(localStorage.getItem('pp_cart') || '[]');

/* =========================
   Utilities & renderers
   ========================= */
function formatRupiah(n){
  return 'Rp' + (n||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function escapeHtml(s){
  return (s+'').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function escapeJs(s){
  return (s+'').replace(/'/g,"\\'").replace(/"/g,'\\"');
}

function createCard(item, mode){
  const el = document.createElement('article');
  // card-product, card-grooming, card-boarding
  el.className = 'card card-' + mode;

  el.innerHTML = `
    <img class="thumb" src="${item.img}" alt="${escapeHtml(item.title)}">
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.desc)}</p>
    <div class="meta">
      <div class="price">${formatRupiah(item.price)}</div>
      <div>
        ${mode === 'product'
          ? `<button class="btn" onclick="addToCart('${escapeJs(item.id)}')">Tambah</button>`
          : mode === 'grooming'
          ? `<button class="btn" onclick="openBooking('${escapeJs(item.id)}')">Booking</button>`
          : `<button class="btn" onclick="openBoardingBooking('${escapeJs(item.id)}')">Booking</button>`}
      </div>
    </div>`;
  return el;
}


function renderAll(){
  const pg = document.getElementById('productsGrid');
  const gg = document.getElementById('groomingGrid');
  const bg = document.getElementById('boardingGrid');
  if(pg){
    renderProducts();
  }
  if(gg){
    gg.innerHTML='';
    GROOMING.forEach(g=> gg.appendChild(createCard(g,'grooming')));
  }
  if(bg){
    bg.innerHTML='';
    BOARDING.forEach(b=> bg.appendChild(createCard(b,'boarding')));
  }
  updateCartUI();
  populateBookingServices();
}

/* =========================
   CART functions
   ========================= */
function addToCart(id){
  const item = PRODUCTS.find(p=>p.id===id) || GROOMING.find(g=>g.id===id) || BOARDING.find(b=>b.id===id);
  if(!item){
    showToast('Item tidak ditemukan');
    return;
  }
  const idx = CART.findIndex(c=>c.id===id);
  if(idx>-1){
    CART[idx].qty += 1;
  } else {
    CART.push({ id:item.id, title:item.title, price:item.price, qty:1 });
  }
  localStorage.setItem('pp_cart', JSON.stringify(CART));
  showToast(item.title + ' ditambahkan ke keranjang');
  updateCartUI();
}

function updateCartUI(){
  const count = CART.reduce((s,i)=>s+i.qty,0);
  const cartCountEl = document.getElementById('cartCount');
  if(!cartCountEl) return;
  if(count>0){
    cartCountEl.style.display='flex';
    cartCountEl.innerText = count;
  } else {
    cartCountEl.style.display='none';
  }
}

function openCart(){
  const modal = document.getElementById('cartModal');
  if(!modal) return showToast('Cart modal tidak ditemukan');
  modal.style.display='flex';
  const list = document.getElementById('cartItems');
  list.innerHTML='';
  if(CART.length===0){
    list.innerHTML = '<p class="small">Keranjang kosong.</p>';
    document.getElementById('cartTotal').innerText='Rp0';
    return;
  }
  CART.forEach(ci=>{
    const row = document.createElement('div');
    row.style.display='flex';
    row.style.justifyContent='space-between';
    row.style.alignItems='center';
    row.style.padding='8px 0';
    row.innerHTML = `
      <div style="flex:1">
        <strong>${escapeHtml(ci.title)}</strong>
        <div class="small">
          Qty: <input type="number" min="1" value="${ci.qty}" style="width:60px" onchange="cartQtyChange('${ci.id}', this.value)">
        </div>
      </div>
      <div style="text-align:right">
        <div>${formatRupiah(ci.price*ci.qty)}</div>
        <div style="margin-top:6px">
          <button class="btn secondary" onclick="removeCart('${ci.id}')">Hapus</button>
        </div>
      </div>`;
    list.appendChild(row);
  });
  const total = CART.reduce((s,i)=>s + i.price * i.qty,0);
  document.getElementById('cartTotal').innerText = formatRupiah(total);
}

function closeCart(){
  const cm = document.getElementById('cartModal');
  if(cm) cm.style.display='none';
}

function clearCart(){
  if(!confirm('Kosongkan keranjang?')) return;
  CART = [];
  localStorage.removeItem('pp_cart');
  updateCartUI();
  openCart();
  showToast('Keranjang dikosongkan');
}

function cartQtyChange(id,val){
  const v = Math.max(1,parseInt(val)||1);
  const idx = CART.findIndex(c=>c.id===id);
  if(idx>-1){
    CART[idx].qty=v;
    localStorage.setItem('pp_cart', JSON.stringify(CART));
    renderAll();
    openCart();
  }
}

function removeCart(id){
  CART = CART.filter(c=>c.id!==id);
  localStorage.setItem('pp_cart', JSON.stringify(CART));
  renderAll();
  openCart();
}

/* =========================
   Checkout
   ========================= */
function openCheckout(){
  const cm = document.getElementById('checkoutModal');
  if(!cm) return showToast('Checkout tidak tersedia');
  cm.style.display='flex';
  closeCart();
  document.getElementById('checkoutName').value='';
  document.getElementById('checkoutPhone').value='';
  document.getElementById('checkoutAddress').value='';
}

function closeCheckout(){
  const cm = document.getElementById('checkoutModal');
  if(cm) cm.style.display='none';
}

function doCheckout(){
  const name = document.getElementById('checkoutName').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();
  const addr = document.getElementById('checkoutAddress').value.trim();

  if(!name || !phone || !addr){
    alert('Lengkapi nama, no HP, dan alamat');
    return;
  }
  if(CART.length === 0){
    alert('Keranjang kosong');
    return;
  }

  const total = CART.reduce((s,i)=>s + i.price * i.qty, 0);

  // --- SIMPAN KE DATABASE ---
  let form = new FormData();
  form.append("name", name);
  form.append("phone", phone);
  form.append("address", addr);
  form.append("items", JSON.stringify(CART));
  form.append("total", total);

  fetch("../api/save_order.php", {
      method: "POST",
      body: form
  })
  .then(res => res.json())
  .then(data => {
      if(data.status === "success"){

          // --- KIRIM WHATSAPP (sama seperti versi kamu) ---
          let msg = `Pesanan dari ${name}%0AAlamat: ${addr}%0AHP: ${phone}%0A%0APesanan:%0A`;
          CART.forEach(i=> msg += `- ${i.title} x${i.qty} (${formatRupiah(i.price)})%0A`);
          msg += `%0ATotal: ${formatRupiah(total)}%0A%0ATerima kasih, mohon konfirmasi pembayaran.`;

          window.open('https://wa.me/628983972472?text=' + msg, '_blank');

          // Kosongkan keranjang
          CART = [];
          localStorage.removeItem('pp_cart');
          updateCartUI();
          closeCheckout();
          showToast('Checkout dikirim via WhatsApp & disimpan ke database');

      } else {
          alert("Gagal menyimpan pesanan: " + data.message);
      }
  })
  .catch(err => {
      console.error(err);
      alert("Terjadi error saat menyimpan pesanan ke server.");
  });
}


/* =========================
   Booking Grooming & Boarding
   ========================= */
function populateBookingServices(){
  const sel = document.getElementById('bkService');
  if(!sel) return;
  sel.innerHTML = '';
  GROOMING.forEach(g => {
    const op = document.createElement('option');
    op.value = g.id;
    op.textContent = `${g.title} — ${formatRupiah(g.price)}`;
    sel.appendChild(op);
  });
}

function populateBoardingServices(){
  const sel = document.getElementById('bbkService');
  if(!sel) return;
  sel.innerHTML = '';
  BOARDING.forEach(b => {
    const op = document.createElement('option');
    op.value = b.id;
    op.textContent = `${b.title} — ${formatRupiah(b.price)}`;
    sel.appendChild(op);
  });
}

function openBooking(id){
  const bm = document.getElementById('bookingModal');
  if(!bm) return showToast('Booking modal tidak ditemukan');
  bm.style.display='flex';
  populateBookingServices();
  if(id){
    const g = GROOMING.find(x=>x.id===id);
    if(g) document.getElementById('bkService').value = g.id;
  }
}

function closeBooking(){
  const bm = document.getElementById('bookingModal');
  if(bm) bm.style.display='none';
}

function openBoardingBooking(id){
  const bbm = document.getElementById('boardingBookingModal');
  if(!bbm) return showToast('Boarding booking modal tidak ditemukan');
  bbm.style.display='flex';
  populateBoardingServices();
  if(id){
    const b = BOARDING.find(x=>x.id===id);
    if(b) document.getElementById('bbkService').value = b.id;
  }
}

function closeBoardingBooking(){
  const bbm = document.getElementById('boardingBookingModal');
  if(bbm) bbm.style.display='none';
}

function submitBooking(type){
  const name  = document.getElementById('bkName').value.trim();
  const phone = document.getElementById('bkPhone').value.trim();
  const pet   = document.getElementById('bkPetName').value.trim();
  const svc   = document.getElementById('bkService').value;
  const date  = document.getElementById('bkDate').value;

  if(!name || !phone || !pet || !svc || !date){
    alert('Lengkapi semua data booking');
    return;
  }

  // simpan ke database
  const fd = new FormData();
  fd.append("name", name);
  fd.append("phone", phone);
  fd.append("pet", pet);
  fd.append("service", svc);
  fd.append("type", "grooming");
  fd.append("date", date);

  fetch("../api/save_booking.php", {
    method: "POST",
    body: fd
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.status !== "success"){
      console.warn("Booking tidak tersimpan:", d.message);
    }
  })
  .catch(err=>console.error(err));

  const serv = GROOMING.find(g=>g.id===svc);
  const msg = `Booking Grooming%0ANama pemilik: ${name}%0AHP: ${phone}%0ANama hewan: ${pet}%0ALayanan: ${serv.title} - ${formatRupiah(serv.price)}%0ATanggal: ${date}%0A%0ATerima kasih.`;
  window.open('https://wa.me/628983972472?text=' + msg, '_blank');
  closeBooking();
  showToast('Booking dikirim via WhatsApp');
}

function submitBoardingBooking(){
  const name    = document.getElementById('bbkName').value.trim();
  const phone   = document.getElementById('bbkPhone').value.trim();
  const pet     = document.getElementById('bbkPetName').value.trim();
  const svc     = document.getElementById('bbkService').value;
  const checkIn = document.getElementById('bbkCheckIn').value;
  const checkOut= document.getElementById('bbkCheckOut').value;

  if(!name || !phone || !pet || !svc || !checkIn || !checkOut){
    alert('Lengkapi semua data booking');
    return;
  }

  // simpan ke database
  const fd = new FormData();
  fd.append("name", name);
  fd.append("phone", phone);
  fd.append("pet", pet);
  fd.append("service", svc);
  fd.append("type", "boarding");
  fd.append("checkIn", checkIn);
  fd.append("checkOut", checkOut);

  fetch("../api/save_booking.php", {
    method: "POST",
    body: fd
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.status !== "success"){
      console.warn("Booking tidak tersimpan:", d.message);
    }
  })
  .catch(err=>console.error(err));

  const serv = BOARDING.find(b=>b.id===svc);
  const msg = `Booking Penitipan Hewan%0ANama pemilik: ${name}%0AHP: ${phone}%0ANama hewan: ${pet}%0ALayanan: ${serv.title} - ${formatRupiah(serv.price)}%0ACheck-In: ${checkIn}%0ACheck-Out: ${checkOut}%0A%0ATerima kasih.`;
  window.open('https://wa.me/628983972472?text=' + msg, '_blank');
  closeBoardingBooking();
  showToast('Booking dikirim via WhatsApp');
}


/* =========================
   AUTH (simple register/login)
   ========================= */
const openLoginBtn = document.getElementById('openLoginBtn');
const authModal = document.getElementById('authModal');
const authCard = document.getElementById('authCard');

if(openLoginBtn) openLoginBtn.addEventListener('click', ()=> showAuth('login'));

function showAuth(mode='login'){
  if(!authModal || !authCard) return console.warn('Auth modal/card tidak tersedia di halaman ini');
  authModal.style.display='flex';
  authCard.innerHTML = authHtml(mode);
  const closeAuthEl = document.getElementById('closeAuth');
  if(closeAuthEl) closeAuthEl.addEventListener('click', ()=> authModal.style.display='none');
  if(mode==='login'){
    document.getElementById('loginBtn').addEventListener('click', doLogin);
    document.getElementById('switchReg').addEventListener('click', ()=> showAuth('register'));
  } else {
    const avatarInput = document.getElementById('avatarInput');
    const preview = document.getElementById('avatarPreview');
    avatarInput.addEventListener('change', function(){
      const f=this.files[0];
      if(!f){
        preview.style.display='none';
        localStorage.removeItem('tmp_avatar');
        return;
      }
      const fr=new FileReader();
      fr.onload=function(e){
        preview.src = e.target.result;
        preview.style.display='block';
        localStorage.setItem('tmp_avatar', e.target.result);
      };
      fr.readAsDataURL(f);
    });
    document.getElementById('registerBtn').addEventListener('click', doRegister);
    document.getElementById('switchLogin').addEventListener('click', ()=> showAuth('login'));
  }
}

function authHtml(mode){
  if(mode==='login'){
    return `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2>Login Pet Paw</h2>
        <button id="closeAuth" style="background:transparent;border:none;font-weight:700;cursor:pointer">✕</button>
      </div>
      <div style="margin-top:8px">
        <input id="loginUser" class="auth-field" placeholder="Username">
        <input id="loginPass" type="password" class="auth-field" placeholder="Password">
        <button id="loginBtn" class="btn" style="width:100%;margin-top:8px">Masuk</button>
        <p class="small" style="margin-top:10px">
          Belum punya akun?
          <a id="switchReg" style="color:var(--primary);cursor:pointer">Daftar</a>
        </p>
      </div>`;
  } else {
    const existing = localStorage.getItem('tmp_avatar') || '';
    return `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2>Buat Akun</h2>
        <button id="closeAuth" style="background:transparent;border:none;font-weight:700;cursor:pointer">✕</button>
      </div>
      <div style="margin-top:8px">
        <input id="regName" class="auth-field" placeholder="Nama lengkap">
        <input id="regUser" class="auth-field" placeholder="Username (unik)">
        <input id="regPass" type="password" class="auth-field" placeholder="Password">
        <label class="small">Foto Profil (opsional)</label>
        <input id="avatarInput" type="file" accept="image/*" style="width:100%"/>
        <img id="avatarPreview" class="avatar-preview" src="${existing}" style="${existing?'display:block':'display:none'}">
        <button id="registerBtn" class="btn" style="width:100%;margin-top:8px">Buat Akun</button>
        <p class="small" style="margin-top:10px">
          Sudah punya akun?
          <a id="switchLogin" style="color:var(--primary);cursor:pointer">Login</a>
        </p>
      </div>`;
  }
}

function doRegister(){
  const name   = document.getElementById('regName').value.trim();
  const user   = document.getElementById('regUser').value.trim();
  const pw     = document.getElementById('regPass').value.trim();
  const avatar = localStorage.getItem('tmp_avatar') || '';

  if (!name || !user || !pw) {
    alert('Isi semua kolom.');
    return;
  }

  // kirim username & password ke server (register.php)
  const formData = new FormData();
  formData.append('username', user);
  formData.append('password', pw);

  fetch("../api/register.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      // optional: simpan nama & avatar di localStorage untuk UI
      const userObj = { name, username: user, password: pw, avatar };
      localStorage.setItem('petpaw_user', JSON.stringify(userObj));
      localStorage.removeItem('tmp_avatar');

      alert('Akun berhasil dibuat. Silakan login.');
      showAuth('login'); // balik ke form login
    } else {
      alert(data.message || 'Registrasi gagal');
    }
  })
  .catch(err => {
    console.error(err);
    alert('Terjadi error pada server');
  });
}

function doLogin(){
  const user = document.getElementById('loginUser').value.trim();
  const pw   = document.getElementById('loginPass').value.trim();

  if(!user || !pw){
    alert('Isi username dan password');
    return;
  }

  const formData = new FormData();
  formData.append('username', user);
  formData.append('password', pw);

  // index.html ada di /html, jadi API di ../api/
  fetch("../api/login.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "success"){
      // simpan sesi di localStorage untuk dipakai update UI
      localStorage.setItem("petpaw_session", JSON.stringify({
        username: user,
        name: user   // kalau nanti mau beda display name, tinggal ubah
      }));

      // tutup modal login
      if (typeof authModal !== "undefined" && authModal) {
        authModal.style.display = "none";
      }

      // update tulisan tombol di kanan atas (Masuk -> Hi, Jihan)
      updateLoggedInUI();

      // kasih notifikasi kecil
      if (typeof showToast === "function") {
        showToast("Login berhasil");
      } else {
        alert("Login berhasil");
      }
    } else {
      alert(data.message || "Username / password salah");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Terjadi error pada server");
  });
}


function updateLoggedInUI(){
  const session = JSON.parse(localStorage.getItem('petpaw_session') || 'null');
  const btn = document.getElementById('openLoginBtn');
  if(session){
    const userData = JSON.parse(localStorage.getItem('petpaw_user') || 'null');
    if(btn){
      btn.innerHTML = `
        <span style="display:flex;align-items:center;gap:8px">
          <img src="../images/logo.jpg"
               style="width:28px;height:28px;border-radius:50%;object-fit:cover">
          Hi, ${session.name.split(' ')[0]}
        </span>`;
      btn.onclick = ()=> {
        if(confirm('Logout?')){
          localStorage.removeItem('petpaw_session');
          updateLoggedInUI();
        }
      };
    }
  } else {
    if(btn){
      btn.innerText = 'Masuk';
      btn.onclick = ()=> showAuth('login');
    }
  }
}

/* =========================
   Admin functions (login + redirect dashboard)
   ========================= */
const adminBtn = document.getElementById('openAdmin');

if (adminBtn) {
  adminBtn.addEventListener('click', () => {
    // ambil data admin dari localStorage, kalau belum ada buat default
    let admin = JSON.parse(localStorage.getItem('pp_admin') || 'null');
    if (!admin) {
      admin = { username: 'admin', password: 'admin123' };
      localStorage.setItem('pp_admin', JSON.stringify(admin));
    }

    const username = prompt('Username admin:');
    if (username === null) return; // cancel
    const password = prompt('Password admin:');
    if (password === null) return; // cancel

    if (username === admin.username && password === admin.password) {
      localStorage.setItem('admin_logged', '1');
      // pastikan file ini ada di folder yang sama dengan index.html
      window.location.href = 'loginadmin_dashboard.html';
    } else {
      alert('Username atau password admin salah!');
    }
  });
}

// Masih disediakan jika nanti kamu tetap ingin pakai modal admin lama (opsional)
function closeAdmin(){
  const am = document.getElementById('adminModal');
  if(am) am.style.display='none';
}

function adminAdd(){
  const typeEl = document.getElementById('adminType');
  const titleEl = document.getElementById('adminTitle');
  const priceEl = document.getElementById('adminPrice');
  const imgEl = document.getElementById('adminImg');
  const descEl = document.getElementById('adminDesc');

  if(!typeEl || !titleEl || !priceEl || !imgEl || !descEl){
    // kalau elemen tidak ada, berarti modal admin tidak dipakai
    return;
  }

  const type = typeEl.value;
  const title = titleEl.value.trim();
  const price = parseInt(priceEl.value) || 0;
  const img = imgEl.value.trim() || 'https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=1200&q=60';
  const desc = descEl.value.trim() || '-';
  if(!title){
    alert('Masukkan judul');
    return;
  }
  const id = (type[0] + Date.now()).toString();
  const obj = { id, title, price, img, desc };
  if(type==='product'){
    PRODUCTS.unshift(obj);
    localStorage.setItem('pp_products', JSON.stringify(PRODUCTS));
  } else if(type==='grooming'){
    GROOMING.unshift(obj);
    localStorage.setItem('pp_grooming', JSON.stringify(GROOMING));
  } else if(type==='boarding'){
    BOARDING.unshift(obj);
    localStorage.setItem('pp_boarding', JSON.stringify(BOARDING));
  }
  closeAdmin();
  renderAll();
  showToast('Item berhasil ditambahkan (admin)');
}

/* =========================
   Toast (notifications)
   ========================= */
function showToast(msg, time=2500){
  const t = document.getElementById('toast');
  if(!t){
    console.log('TOAST:', msg);
    return;
  }
  t.innerText = msg;
  t.style.display='block';
  t.style.opacity=1;
  setTimeout(()=>{
    t.style.transition='opacity 300ms';
    t.style.opacity=0;
    setTimeout(()=> t.style.display='none',300);
  }, time);
}

/* =========================
   Search
   ========================= */
function performSearch(){
  const input = document.getElementById('globalSearch');
  if(!input){
    showToast('Kolom pencarian tidak ditemukan');
    return;
  }

  const q = input.value.trim().toLowerCase();
  if(!q){
    showToast('Masukkan kata kunci');
    return;
  }

  const all = [...PRODUCTS, ...GROOMING, ...BOARDING];
  const results = all.filter(x =>
    x.title.toLowerCase().includes(q) ||
    x.desc.toLowerCase().includes(q)
  );

  if(results.length === 0){
    showToast('Tidak ada hasil untuk: ' + q);
    return;
  }

  // tampilkan hasil di grid produk
  const pg = document.getElementById('productsGrid');
  if(!pg){
    alert('Grid produk tidak ditemukan');
    return;
  }

  pg.innerHTML = ''; // kosongkan dulu

  results.forEach(item => {
    let mode = 'product';
    if (GROOMING.find(g => g.id === item.id)) mode = 'grooming';
    if (BOARDING.find(b => b.id === item.id)) mode = 'boarding';
    pg.appendChild(createCard(item, mode));
  });

  // scroll ke bagian produk biar user langsung lihat
  scrollToId('products');
  showToast('Menampilkan ' + results.length + ' hasil untuk: ' + q);
}

/* =========================
   Dark mode toggle
   ========================= */
const darkToggle = document.getElementById('darkToggle');
if(darkToggle) darkToggle.addEventListener('click', ()=> {
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark') ? 'Dark mode aktif' : 'Light mode aktif');
});

/* =========================
   Small helpers & init
   ========================= */
function scrollToId(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}

const cartOpenEl = document.getElementById('cartOpen');
if(cartOpenEl) cartOpenEl.addEventListener('click', openCart);

document.addEventListener('DOMContentLoaded', function(){
  loadDataFromAPI();         // ambil dari database lewat API
  // kalau session lama sudah dimatiin, bagian ini bisa dikosongin
  populateBookingServices();
});

document.addEventListener('DOMContentLoaded', function(){
  // render kartu produk, grooming, boarding
  renderAll();

  // kalau kamu masih pakai sesi login di localStorage
  try {
    const sess = JSON.parse(localStorage.getItem('petpaw_session')) || null;
    if(sess) updateLoggedInUI();
  } catch(e){}

  // isi dropdown booking grooming
  populateBookingServices();
});

// =========================
//   Nav: smooth scroll + active link
// =========================
document.addEventListener('DOMContentLoaded', function () {
  // ambil semua link nav yang menuju id di halaman (href="#...")
  const navLinks = Array.from(
    document.querySelectorAll('header nav a[href^="#"]')
  );
  if (!navLinks.length) return;

  // mapping section by id
  const sections = [];
  const linkById = {};

  navLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1); // buang '#'
    const sec = document.getElementById(id);
    if (sec) {
      sections.push(sec);
      linkById[id] = link;
    }
  });

  // klik menu → smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      scrollToId(id); // pakai fungsi scrollToId yang sudah kamu punya
    });
  });

  // helper: set active link
  function setActive(id) {
    navLinks.forEach(a => {
      a.classList.toggle('active', a === linkById[id]);
    });
  }

  // observer untuk mendeteksi section mana yang sedang di layar
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      threshold: 0.5 // minimal 50% section kelihatan baru dianggap aktif
    }
  );

  sections.forEach(sec => observer.observe(sec));
});
