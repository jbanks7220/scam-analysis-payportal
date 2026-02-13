// Mobile menu toggle
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

if (btn) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// Hero slideshow
const slides = document.querySelectorAll("#hero-slideshow img");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.style.opacity = i === index ? "1" : "0";
  });
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}
