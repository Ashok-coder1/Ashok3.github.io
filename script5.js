

// ===== NETWORK BACKGROUND ANIMATION =====
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
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

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) particlesArray.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => { p.update(); p.draw(); });
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
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

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
      if (href && !href.startsWith("tel:") && !href.startsWith("#")) {
        e.preventDefault();
        setTimeout(() => {
          if (target === "_blank") window.open(href, "_blank");
          else window.location.href = href;
        }, 120);
      }
    }
  });
})();