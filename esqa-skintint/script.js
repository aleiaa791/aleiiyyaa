const waNumber = "6285731838324";
let quantity = 1;
const qtyOutput = document.getElementById("qty");
document.getElementById("minus").addEventListener("click", () => { quantity = Math.max(1, quantity - 1); qtyOutput.textContent = quantity; });
document.getElementById("plus").addEventListener("click", () => { quantity = Math.min(20, quantity + 1); qtyOutput.textContent = quantity; });
document.getElementById("orderButton").addEventListener("click", () => {
  const shade = document.getElementById("shade").value || "mohon rekomendasi / konfirmasi shade";
  const message = `Halo bycaeL, saya ingin memesan ESQA Blurring Serum Skintint. Jumlah: ${quantity}. Shade: ${shade}. Mohon konfirmasi stok, total harga, dan ongkos kirim ya.`;
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(open)); menuToggle.textContent = open ? "×" : "☰"; });
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.textContent = "☰"; }));