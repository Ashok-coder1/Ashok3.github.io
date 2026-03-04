

// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector("header nav");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Background Animation
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
    if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle="rgba(0,255,255,0.5)";
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fill();
  }
}

function init(){
  particlesArray = [];
  for(let i=0; i<100; i++) particlesArray.push(new Particle());
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  for(let i=0; i<particlesArray.length; i++){
    for(let j=i; j<particlesArray.length; j++){
      let dx = particlesArray[i].x - particlesArray[j].x;
      let dy = particlesArray[i].y - particlesArray[j].y;
      let dist = dx*dx + dy*dy;
      if(dist < 8000){
        ctx.strokeStyle="rgba(0,255,255,0.1)";
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

  
// ===== CLICK SOUND & LINK HANDLING =====
(function () {
  const clickSound = new Audio("click.mp3"); // adjust path if needed
  clickSound.volume = 0.6;

  document.addEventListener("click", function (e) {
    const el = e.target.closest("a, button");
    if (!el) return;

    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    // Handle link navigation
    if (el.tagName.toLowerCase() === "a") {
      const href = el.getAttribute("href");
      const target = el.getAttribute("target");

      // Skip tel: and hash links
      if (href && !href.startsWith("tel:") && !href.startsWith("#")) {
        e.preventDefault(); // stop immediate navigation

        setTimeout(() => {
          if (target === "_blank") {
            window.open(href, "_blank"); // open in new tab
          } else {
            window.location.href = href; // same tab
          }
        }, 120); // short delay for click sound
      }
    }
  });
})();