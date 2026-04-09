var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/69a832867b02b21c3601f10d/1jisgannc';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();


const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
let particlesArray = [];

const init = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = Array.from({length: 100}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5),
        speedY: (Math.random() - 0.5)
    }));
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
        ctx.fillStyle = "rgba(0,255,255,0.5)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
    });

    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            if (dx*dx + dy*dy < 8000) {
                ctx.strokeStyle = "rgba(0,255,255,0.1)";
                ctx.beginPath(); ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
};
init(); animate();
window.addEventListener("resize", init);

function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
}

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
                    if (target === "_blank") window.open(href, "_blank");
                    else window.location.href = href;
                }, 120);
            }
        }
    });
})();

document.addEventListener("click", function playMusic() {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.play().catch(err => console.log("Autoplay blocked:", err));
        document.removeEventListener("click", playMusic);
    }
});


window.gtranslateSettings = {
    "default_language": "en",
    "languages": ["en", "ne", "hi", "zh-CN", "ko", "fr", "es", "ar", "pt", "de", "ja", "ru"],
    "wrapper_selector": ".gtranslate_wrapper",
    "flag_size": 24,
    "alt_flags": {"en": "usa"}
};

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('gt_selector')) {
        if (e.target.value === 'en|en') {
            location.reload();
        }
    }
});

function closeTranslate() {
    var wrapper = document.getElementById('translateWrapper');
    if (wrapper) wrapper.style.display = 'none';
}
