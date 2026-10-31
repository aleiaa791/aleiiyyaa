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
const shadeSelect = document.getElementById("shade");
document.querySelectorAll(".shade-swatches [data-shade]").forEach((chip) => {
  chip.addEventListener("click", () => {
    shadeSelect.value = chip.dataset.shade;
    document.querySelectorAll(".shade-swatches [data-shade]").forEach((item) => item.classList.toggle("active", item === chip));
  });
});
shadeSelect.addEventListener("change", () => {
  document.querySelectorAll(".shade-swatches [data-shade]").forEach((chip) => chip.classList.toggle("active", chip.dataset.shade === shadeSelect.value));
});


/* Reliable scroll-triggered entrance animation (reviews through footer) */
(() => {
  const targets = document.querySelectorAll(
    ".review-section .review-inner, .review-section .review-summary, " +
    ".about-section .about-art, .about-section .about-copy, " +
    ".policy-section .section-heading, .policy-grid details, " +
    ".contact-section > div, footer > *"
  );
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js-scroll-motion");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("motion-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
  targets.forEach(target => observer.observe(target));
})();
