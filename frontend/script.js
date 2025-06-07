// Navega de index.html → chat.html
function getStarted() {
  window.location.href = "/chat.html";
}

// En chat.html: enviar mensaje a tu endpoint RAG
async function sendMessage() {
  const inp = document.getElementById("user-input");
  const msg = inp.value.trim();
  if (!msg) return;

  addMessage("user", msg);
  inp.value = "";

  try {
    const res = await fetch("/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    addMessage("bot", data.reply);
  } catch (e) {
    addMessage("bot", "Error contactando al servidor.");
    console.error(e);
  }
}

// Añade burbujas de mensaje
function addMessage(who, text) {
  const cont = document.getElementById("messages");
  const div  = document.createElement("div");
  div.classList.add("message", who);
  div.innerText = text;
  cont.appendChild(div);
  cont.scrollTop = cont.scrollHeight;
}

// --- AÑADIDO al final: dropdown Contact y scroll al formulario ---
document.addEventListener('DOMContentLoaded', () => {
  const contactToggle = document.getElementById('contact-toggle');
  const contactMenu   = document.getElementById('contact-menu');

  contactToggle.addEventListener('click', () => {
    contactMenu.style.display =
      contactMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.getElementById('contact-email')
    .addEventListener('click', () => {
      contactMenu.style.display = 'none';
      document.getElementById('contact-form')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

  window.addEventListener('click', e => {
    if (!contactToggle.contains(e.target) && !contactMenu.contains(e.target)) {
      contactMenu.style.display = 'none';
    }
  });
});
// Control del carrusel de servicios
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.carousel-container');

  containers.forEach(container => {
    const carousel = container.querySelector('.carousel');
    const btnPrev  = container.querySelector('.carousel-btn.prev');
    const btnNext  = container.querySelector('.carousel-btn.next');

    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left:  carousel.offsetWidth, behavior: 'smooth' });
    });
  });
});

// Capturar el envío del formulario y abrir mailto: con asunto y cuerpo formateado
document.querySelector('.contact-section form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = encodeURIComponent(this.name.value);
    const email   = encodeURIComponent(this.email.value);
    const message = encodeURIComponent(this.message.value);
    const subject = encodeURIComponent('Contacto desde Web Data Studio Asteroids');
    const body    = `Nombre: ${name}%0D%0AEmail: ${email}%0D%0AMensaje: ${message}`;

    window.location.href =
      `mailto:studioasteroids0@gmail.com?subject=${subject}&body=${body}`;
  });
  
