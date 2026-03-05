// ===== BACKGROUND MUSIC =====
document.addEventListener("click", function playMusic() {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.play().catch(err => console.log("Autoplay blocked:", err));
    document.removeEventListener("click", playMusic);
  }
});

// ===== CAROUSEL ROTATION & DYNAMIC SCALING =====
const carousel = document.getElementById("carousel");
const carouselItems = carousel ? carousel.querySelectorAll(".carousel-item") : [];
const buttons = document.querySelectorAll(".buttons button");

const itemCount = carouselItems.length;

let currentIndex = 0;

function getTranslateZ() {
  const vw = window.innerWidth;
  if (vw <= 480) return 120; // Mobile
  if (vw <= 768) return 160; // Tablet
  return 300; // Desktop
}

function setCarouselPositions() {
  if (!carousel || itemCount === 0) return;

  const angle = 360 / itemCount;
  const translateZ = getTranslateZ();

  carouselItems.forEach((item, i) => {
    item.style.transform = `rotateY(${angle * i}deg) translateZ(${translateZ}px)`;
  });
}

function rotateTo(index) {
  if (!carousel || itemCount === 0) return;

  const angle = 360 / itemCount;

  currentIndex = index;

  if (currentIndex >= itemCount) currentIndex = 0;
  if (currentIndex < 0) currentIndex = itemCount - 1;

  carousel.style.transform = `rotateY(${-angle * currentIndex}deg)`;

  updateButtons();
}

// ===== BUTTON ACTIVE STYLE =====
function updateButtons() {
  buttons.forEach((btn, i) => {
    if (i === currentIndex) {
      btn.style.background = "#16a34a";
    } else {
      btn.style.background = "#22c55e";
    }
  });
}

// ===== BUTTON CLICK =====
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    rotateTo(index);
  });
});

// ===== MOBILE SWIPE SCROLL =====
let startX = 0;
let endX = 0;

if (carousel) {

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {

    let diff = startX - endX;

    if (diff > 50) {
      rotateTo(currentIndex + 1); // swipe left
    }

    if (diff < -50) {
      rotateTo(currentIndex - 1); // swipe right
    }

  });

}

// Initial setup
setCarouselPositions();
rotateTo(0);

window.addEventListener("resize", setCarouselPositions);

// ===== NETWORK BACKGROUND ANIMATION =====
const canvas = document.getElementById("network-bg");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speedX = (Math.random() - 0.5) * 1;
      this.speedY = (Math.random() - 0.5) * 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = "rgba(0,255,255,0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });

    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i; j < particlesArray.length; j++) {

        let dx = particlesArray[i].x - particlesArray[j].x;
        let dy = particlesArray[i].y - particlesArray[j].y;

        let dist = dx * dx + dy * dy;

        if (dist < 8000) {
          ctx.strokeStyle = "rgba(0,255,255,0.1)";
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  });
}

// ===== CLICK SOUND & LINK HANDLING =====
(function () {

  const clickSound = new Audio("click.mp3");
  clickSound.volume = 0.6;

  document.addEventListener("click", function (e) {

    const el = e.target.closest("a, button");

    if (!el) return;

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (el.tagName.toLowerCase() === "a") {

      const href = el.getAttribute("href");
      const target = el.getAttribute("target");

      if (href && !href.startsWith("tel:") && !href.startsWith("#") && !href.startsWith("javascript:")) {

        e.preventDefault();

        setTimeout(() => {

          if (target === "_blank") {
            window.open(href, "_blank");
          } else {
            window.location.href = href;
          }

        }, 120);

      }
    }

  });

})();
