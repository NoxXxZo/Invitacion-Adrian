// Pantalla inicial con partículas
const intro = document.getElementById("intro-screen");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 2,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fc9736";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
// Ajustar canvas al redimensionar ventana
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // lo llamamos una vez al inicio
// Función genérica para inicializar partículas en cualquier canvas
function initParticles(canvasId, color = "#fc9736", count = 50) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];

  function createParticles() {
    particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 2,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }

  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    createParticles(); // regenerar partículas al cambiar tamaño
  });
}

// Llamar en la intro
initParticles("particles", "#fc9736", 50);

// Llamar en la página principal
initParticles("particles-main", "#fc9736", 40); // otro color opcional

function explodeCapibaras() {
  const explosion = document.getElementById("capibara-explosion");
  const images = [
    "assets/img/cap1.png",
    "assets/img/cap2.png",
    "assets/img/cap3.png",
    "assets/img/cap4.png",
  ];

  for (let i = 0; i < 20; i++) {
    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    img.classList.add("capibara-particle");

    // posición inicial (centro de pantalla)
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%) scale(0.5)";

    explosion.appendChild(img);

    // animar con timeout
    setTimeout(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200 + 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      img.style.opacity = 1;
      img.style.transform = `translate(${x}px, ${y}px) scale(1) rotate(${
        Math.random() * 360
      }deg)`;
    }, 50);

    // limpiar después de animación
    setTimeout(() => {
      img.remove();
    }, 1500);
  }
}

intro.addEventListener("click", () => {
  explodeCapibaras();

  setTimeout(() => {
    intro.style.display = "none";
    music.play().catch((e) => console.log("Reproducción bloqueada:", e));
    playing = true;
    musicBtn.textContent = "⏸ Pausa";
  }, 1200); // esperar animación antes de pasar al index
});

// Música
const musicBtn = document.getElementById("music-btn");
const music = document.getElementById("bg-music");
let playing = false;
musicBtn.addEventListener("click", () => {
  if (playing) {
    music.pause();
    musicBtn.textContent = "▶ Música";
  } else {
    music.play();
    musicBtn.textContent = "⏸ Pausa";
  }
  playing = !playing;
});

// Menú hamburguesa
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
document.querySelectorAll(".divider").forEach((div) => {
  div.innerHTML = "";
  const images = [
    "assets/img/cap1.png",
    "assets/img/cap2.png",
    "assets/img/cap3.png",
    "assets/img/cap4.png",
  ];
  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    div.appendChild(img);
  }
});
function lanzarCapibaras() {
  const container = document.body; // o algún contenedor específico
  const total = 3; // cuántas capibaras quieres flotando a la vez

  for (let i = 0; i < total; i++) {
    const img = document.createElement("img");
    img.src = "assets/img/miscumple.png";
    img.classList.add("balloon-capibara");

    // posición horizontal aleatoria (10% a 90%)
    img.style.left = Math.floor(Math.random() * 80 + 10) + "%";

    // retraso aleatorio para que no suban todas juntas
    img.style.animationDelay = Math.random() * 10 + "s";

    container.appendChild(img);

    // cuando termine una subida, lo volvemos a reposicionar
    img.addEventListener("animationiteration", () => {
      img.style.left = Math.floor(Math.random() * 80 + 10) + "%";
    });
  }
}

// llamar al inicio
lanzarCapibaras();

// Countdown
function updateCountdown() {
  const eventDate = new Date("2025-09-13T18:00:00-03:00"); // 13 de septiembre 2025, 18:00 hora Chile
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    // ya es el día del evento
    document.getElementById("countdown").style.display = "none";
    document.getElementById("event-message").textContent = "🎉 ¡Es Hoy! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

setInterval(updateCountdown, 1000 * 60); // se actualiza cada minuto
updateCountdown(); // se ejecuta al cargar
//calendario
const googleCal = document.getElementById("google-cal");
googleCal.href =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Cumpleaños+de+Adrián" +
  "&dates=20250913T200000Z/20250914T020000Z" + // UTC: empieza 13 sep 21:00, termina 14 sep 02:00
  "&details=¡Te+espero+para+festejar!" +
  "&location=Sta.+María+2144,+Calama,+Chile";
// 🚫 Bloquear click derecho en toda la página
document.addEventListener("contextmenu", (e) => e.preventDefault());

// 🚫 Bloquear arrastrar imágenes
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
    img.style.pointerEvents = "none"; // evita arrastrar o abrir menú contextual
  });
});
