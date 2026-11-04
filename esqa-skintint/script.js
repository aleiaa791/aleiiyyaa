const waNumber = "6285731838324";
const productName = "ESQA Blurring Serum Skintint 15ml";
const unitPrice = 112000;
let quantity = 1;
let cart = [];
const qtyOutput = document.getElementById("qty");
const shadeSelect = document.getElementById("shade");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const paymentTotal = document.getElementById("paymentTotal");
const checkoutButton = document.getElementById("checkoutButton");
const rupiah = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const saveCart = () => { try { localStorage.setItem("bycaeL_cart", JSON.stringify(cart)); } catch (_) {} };
const readCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("bycaeL_cart") || "[]");
    return Array.isArray(saved) ? saved.filter(item => item && typeof item.shade === "string" && Number.isInteger(item.qty) && item.qty > 0).map(item => ({ shade: item.shade, qty: Math.min(20, item.qty) })) : [];
  } catch (_) { return []; }
};
const totalItems = () => cart.reduce((sum, item) => sum + item.qty, 0);
const totalPrice = () => totalItems() * unitPrice;
function renderCart() {
  if (!cartItems) return;
  cartItems.replaceChildren();
  if (!cart.length) {
    const empty = document.createElement("p");
    empty.className = "cart-empty";
    empty.textContent = "Keranjang masih kosong. Tambahkan produk terlebih dahulu.";
    cartItems.append(empty);
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      const info = document.createElement("div");
      info.className = "cart-item-info";
      const title = document.createElement("b");
      title.textContent = productName;
      const shade = document.createElement("small");
      shade.textContent = "Shade: " + item.shade;
      info.append(title, shade);
      const controls = document.createElement("div");
      controls.className = "cart-item-controls";
      const minus = document.createElement("button");
      minus.type = "button"; minus.textContent = "−"; minus.setAttribute("aria-label", "Kurangi jumlah " + item.shade);
      minus.addEventListener("click", () => changeCartQty(index, -1));
      const count = document.createElement("span"); count.textContent = item.qty;
      const plus = document.createElement("button");
      plus.type = "button"; plus.textContent = "+"; plus.setAttribute("aria-label", "Tambah jumlah " + item.shade);
      plus.disabled = item.qty >= 20;
      plus.addEventListener("click", () => changeCartQty(index, 1));
      const remove = document.createElement("button");
      remove.type = "button"; remove.className = "cart-remove"; remove.textContent = "Hapus";
      remove.addEventListener("click", () => { cart.splice(index, 1); updateCart(); });
      controls.append(minus, count, plus, remove);
      const price = document.createElement("strong"); price.className = "cart-item-price"; price.textContent = rupiah(item.qty * unitPrice);
      row.append(info, controls, price);
      cartItems.append(row);
    });
  }
  cartSubtotal.textContent = rupiah(totalPrice());
  if (paymentTotal) paymentTotal.textContent = rupiah(totalPrice());
  checkoutButton.disabled = cart.length === 0;
  checkoutButton.textContent = cart.length ? "Lanjut ke Checkout ↓" : "Keranjang Kosong";
}
function updateCart() { saveCart(); renderCart(); }
function changeCartQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, Math.min(20, cart[index].qty + delta));
  updateCart();
}
document.getElementById("minus")?.addEventListener("click", () => { quantity = Math.max(1, quantity - 1); qtyOutput.textContent = quantity; });
document.getElementById("plus")?.addEventListener("click", () => { quantity = Math.min(20, quantity + 1); qtyOutput.textContent = quantity; });
document.getElementById("addToCartButton")?.addEventListener("click", () => {
  const shade = shadeSelect.value;
  const notice = document.getElementById("cartNotice");
  if (!shade) {
    notice.textContent = "Silakan pilih shade terlebih dahulu sebelum menambahkan produk.";
    shadeSelect.focus();
    return;
  }
  const existing = cart.find(item => item.shade === shade);
  if (existing) existing.qty = Math.min(20, existing.qty + quantity);
  else cart.push({ shade, qty: quantity });
  updateCart();
  notice.textContent = productName + " shade " + shade + " berhasil ditambahkan ke keranjang.";
  document.getElementById("cart").scrollIntoView({ behavior: "smooth", block: "start" });
});
checkoutButton?.addEventListener("click", () => {
  if (!cart.length) return;
  document.getElementById("payment").scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("buyerName")?.focus({ preventScroll: true });
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => { const open = nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(open)); menuToggle.textContent = open ? "×" : "☰"; });
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.textContent = "☰"; }));
document.querySelectorAll(".shade-swatches [data-shade]").forEach(chip => {
  chip.addEventListener("click", () => {
    shadeSelect.value = chip.dataset.shade;
    document.querySelectorAll(".shade-swatches [data-shade]").forEach(item => item.classList.toggle("active", item === chip));
  });
});
shadeSelect?.addEventListener("change", () => {
  document.querySelectorAll(".shade-swatches [data-shade]").forEach(chip => chip.classList.toggle("active", chip.dataset.shade === shadeSelect.value));
});
const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
function updatePaymentMethod() {
  const selected = document.querySelector('input[name="paymentMethod"]:checked')?.value || "Transfer Bank";
  const bankPanel = document.getElementById("bankDemo");
  const qrisPanel = document.getElementById("qrisDemo");
  const whatsappPanel = document.getElementById("whatsappDemo");
  if (bankPanel) bankPanel.hidden = selected !== "Transfer Bank";
  if (qrisPanel) qrisPanel.hidden = selected !== "QRIS";
  if (whatsappPanel) whatsappPanel.hidden = selected !== "WhatsApp";
}
paymentRadios.forEach(radio => radio.addEventListener("change", updatePaymentMethod));
updatePaymentMethod();
document.getElementById("paymentForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!cart.length) {
    document.getElementById("paymentResult").textContent = "Keranjang masih kosong. Tambahkan produk sebelum checkout.";
    document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (!form.reportValidity()) return;
  const lines = cart.map(item => "- " + productName + " | Shade: " + item.shade + " | Jumlah: " + item.qty + " | " + rupiah(item.qty * unitPrice));
  const message = [
    "Halo bycaeL, saya ingin melanjutkan pesanan berikut:",
    "",
    ...lines,
    "",
    "Subtotal: " + rupiah(totalPrice()),
    "Metode pembayaran: " + (document.querySelector('input[name="paymentMethod"]:checked')?.value || "Transfer Bank") + " (simulasi)",
    "Nama: " + document.getElementById("buyerName").value.trim(),
    "WhatsApp: " + document.getElementById("buyerPhone").value.trim(),
    "Alamat: " + document.getElementById("buyerAddress").value.trim(),
    "",
    "Mohon konfirmasi stok dan ongkos kirim. Saya akan menunggu detail pembayaran sebelum transfer. Terima kasih."
  ].join("\n");
  window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener");
});
cart = readCart();
renderCart();

/* Reliable scroll-triggered entrance animation (reviews through footer) */
(() => {
  const targets = document.querySelectorAll(".review-section .review-inner, .review-section .review-summary, .about-section .about-art, .about-section .about-copy, .policy-section .section-heading, .policy-grid details, .contact-section > div, footer > *");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js-scroll-motion");
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("motion-visible"); obs.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
  targets.forEach(target => observer.observe(target));
})();
