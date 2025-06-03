//Cuenta pestañas y preferencias
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('.nav-pestanas ul li');
  const reviews = document.querySelector('.reviews');
  const preferencias = document.querySelector('.preferencias');

  // Inicial mostrar solo Reviews con clase activa
  reviews.classList.add('activa');
  preferencias.classList.remove('activa');
  tabs[0].classList.add('activa');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Quitar activa de todas las tabs y contenidos
      tabs.forEach(t => t.classList.remove('activa'));
      reviews.classList.remove('activa');
      preferencias.classList.remove('activa');

      // Activar la tab clickeada
      tab.classList.add('activa');

      // Mostrar el contenido correspondiente
      if (index === 0) {
        reviews.classList.add('activa');
      } else if (index === 1) {
        preferencias.classList.add('activa');
      }
    });
  });
});

//Redirige el formulario y cambia el boton por los iconos
document.addEventListener("DOMContentLoaded", () => {
  const zonaUsuario = document.getElementById("zona-usuario");

  const usuarioLogueado = localStorage.getItem("usuarioLogueado") === "true";

  if (!usuarioLogueado) {
    zonaUsuario.innerHTML = `<button id="btn_registrate">Regístrate</button>`;

    document.getElementById("btn-registrar").addEventListener("click", () => {
      localStorage.setItem("usuarioLogueado", "true");
      // Redirige al formulario de registro real
      window.location.href = "register.html";
    });
  } else {
    zonaUsuario.innerHTML = `
      <a href="cuenta.html"><img src="imagenes/user.png" alt="Cuenta" class="icon-img"></a>
    `;
  }
});


//cierra sesiòn y vuelve al inicio
document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesionBtn = document.querySelector(".cerrar-sesion-btn");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "index.html";
    });
  }
});


// Cambiar el header del index
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.tambo-header');
  if (!header) return;

  const path = window.location.pathname;
  if (path.endsWith('index.html') || path === '/' || path === '') {
    header.classList.add('tambo-header-home');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector('footer');
  const path = window.location.pathname;

  if (!footer) return;

  if (path.endsWith('index.html') || path === '/' || path === '') {
    footer.classList.add('footer-home');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const blurOverlay = document.querySelector(".blur-overlay");

  if (menuToggle && blurOverlay) {
    menuToggle.addEventListener("change", () => {
      if (menuToggle.checked) {
        blurOverlay.classList.add("visible");
      } else {
        blurOverlay.classList.remove("visible");
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const popupContainer = document.getElementById("popupContainer");
  const closeBtn = document.getElementById("closeBtn");
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const popupSubtitle = document.getElementById("popupSubtitle");
  const goToRegister = document.getElementById("goToRegister");

  // Botón registrate en index
  const registerButton = document.getElementById("btn_registrate");
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      popupContainer.style.display = "flex";
      registerTab.click();
    });
  }

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    popupSubtitle.innerText = "Bienvenido de vuelta!";
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    popupSubtitle.innerText = "Crea tu cuenta";
  });

  closeBtn.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });

  if (goToRegister) {
    goToRegister.addEventListener("click", (e) => {
      e.preventDefault();
      registerTab.click();
    });
  }

  //  MANEJO DEL LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío real del formulario

    // Simulamos login exitoso
    localStorage.setItem("usuarioLogueado", "true");

    // Cerrar ventana emergente
    popupContainer.style.display = "none";

    // Actualizar el header
    const zonaUsuario = document.getElementById("zona-usuario");
    zonaUsuario.innerHTML = `
      <a href="cuenta.html"><img src="imagenes/user.png" alt="Cuenta" class="icon-img"></a>
    `;
  });

  //  MANEJO DEL REGISTRO
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    localStorage.setItem("usuarioLogueado", "true");

    popupContainer.style.display = "none";

    const zonaUsuario = document.getElementById("zona-usuario");
    zonaUsuario.innerHTML = `
      <a href="cuenta.html"><img src="imagenes/user.png" alt="Cuenta" class="icon-img"></a>
    `;
  });
});







/*Banner del home */
const eventos = [
  {
    fecha: "31",
    mes: "Mayo",
    dia: "Sábado",
    lugar: "Teatro Municipal",
    hora: "20:00"
  },
  {
    fecha: "1",
    mes: "Junio",
    dia: "Domingo",
    lugar: "Teatro Nuna",
    hora: "21:00"
  },
  {
    fecha: "7",
    mes: "Junio",
    dia: "Viernes",
    lugar: "Teatro Municipal",
    hora: "20:00"
  },
  {
    fecha: "4",
    mes: "Junio",
    dia: "Miércoles",
    lugar: "Museo Nacional de Arte",
    hora: "14:00"
  }
];

let index = 0;
const botones = document.querySelectorAll(".componentes li");
function actualizarEvento() {
  const e = eventos[index];
  document.getElementById("fecha").textContent = e.fecha;
  document.getElementById("mes").textContent = e.mes;
  document.getElementById("dia").textContent = e.dia;
  document.getElementById("lugar").textContent = e.lugar;
  document.getElementById("hora").textContent = e.hora;
   botones.forEach((btn, i) => {
      btn.style.backgroundColor = i === index ? "#BABA2B" : "#d9d9d9";
    });

  index = (index + 1) % eventos.length;
}
actualizarEvento();
// sincroniza con 16s / 4 = 4s por evento
setInterval(actualizarEvento, 2900);
/*fin de banner de home */

/*inicio banner evento especifico */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.evento-hero-carrusel .slide');
  const dots = document.querySelectorAll('.carrusel-indicadores .dot');
  let current = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[current].classList.remove('activo');
      dots[current].classList.remove('activo');
      current = (current + 1) % slides.length;
      slides[current].classList.add('activo');
      dots[current].classList.add('activo');
    }, 2000);
  }
});
/*fin banner evento especifico */


/*INICIO informacion.html */
document.addEventListener("DOMContentLoaded", function () {
  // Solo aplicar efecto en informacion.html
  if (document.body.classList.contains("modo-informacion")) {
    const header = document.querySelector(".tambo-header");
    const heroCarrusel = document.querySelector(".evento-hero-carrusel");

    function verificarTransparencia() {
      const heroBottom = heroCarrusel.getBoundingClientRect().bottom;
      if (heroBottom <= 1050) {
        header.classList.add("header-solido");
      } else {
        header.classList.remove("header-solido");
      }
    }

    window.addEventListener("scroll", verificarTransparencia);
    verificarTransparencia();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Solo aplica si estamos en informacion.html
  if (document.body.classList.contains("modo-informacion")) {
    const header = document.querySelector(".tambo-header");
    const hero = document.querySelector(".evento-hero-carrusel");

    const ajustarHeader = () => {
      if (window.scrollY > hero.offsetHeight - 100) {
        header.classList.remove("header-transparente");
        header.style.borderBottom = "5px solid #4C2634"; // vuelve el borde
      } else {
        header.classList.add("header-transparente");
        header.style.borderBottom = "none"; // quita el borde
      }
    };

    window.addEventListener("scroll", ajustarHeader);
    ajustarHeader(); // Ejecuta una vez al cargar
  }
});

  document.addEventListener("DOMContentLoaded", () => {
    const activos = document.querySelectorAll(".columna-indice li.activo");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("encendido");
        }
      });
    }, {
      threshold: 0.5 // El 50% del elemento debe estar visible
    });

    activos.forEach(activo => observer.observe(activo));
  });

  document.addEventListener("DOMContentLoaded", () => {
  const frase = document.querySelector(".frase-final");
  const nodes = Array.from(frase.childNodes);

  frase.innerHTML = "";

  nodes.forEach(node => {
    if (node.nodeName === "BR") {
      frase.appendChild(document.createElement("br"));
    } else {
      node.textContent.split("").forEach(letra => {
        const span = document.createElement("span");
        span.textContent = letra;
        frase.appendChild(span);
      });
    }
  });

  const spans = frase.querySelectorAll("span");

  // Función para animar letras
  function animarLetras() {
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add("relleno");
      }, i * 50);
    });
  }

  // Observer para detectar visibilidad
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animarLetras();
        obs.unobserve(entry.target); // animar solo una vez
      }
    });
  }, { threshold: 0.5 });

  observer.observe(frase);
});

  document.addEventListener('DOMContentLoaded', () => {
    const commentsSection = document.getElementById('comments-section');
    const commentPopup = document.getElementById('comment-popup');
    const openPopupButton = document.getElementById('open-comment-popup');
    const closePopupButton = document.getElementById('close-comment-popup');
    let overlay; // Para el overlay de fondo

    // Función para crear y mostrar el overlay
    function showOverlay() {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closePopup); // Cerrar al hacer clic en el overlay
      }
      overlay.style.display = 'block';
    }

    // Función para ocultar el overlay
    function hideOverlay() {
      if (overlay) {
        overlay.style.display = 'none';
      }
    }

    // Función para abrir el pop-up
    function openPopup() {
      commentPopup.style.display = 'flex'; // 'flex' porque así lo tienes en tu CSS para display
      showOverlay();
      document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    }

    // Función para cerrar el pop-up
    function closePopup() {
      commentPopup.style.display = 'none';
      hideOverlay();
      document.body.style.overflow = ''; // Restaura el scroll del fondo
    }

    // Evento para abrir el pop-up con el botón "Comentar"
    if (openPopupButton) {
      openPopupButton.addEventListener('click', openPopup);
    }

    // Evento para cerrar el pop-up con el icono de cerrar
    if (closePopupButton) {
      closePopupButton.addEventListener('click', closePopup);
    }

    // Funcionalidad de Intersection Observer para el scroll automático
    if (commentsSection) {
      const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.5 // Cuando al menos el 50% de la sección esté visible
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // La sección de comentarios está visible
            openPopup();
            // Desconectar el observer una vez que se muestra el pop-up para que no se repita
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      observer.observe(commentsSection);
    }
  });
/*FIN informacion.html */

/* Cuenta */

document.addEventListener("DOMContentLoaded", function () {
  const editarBtn = document.querySelector('.editar-perfil');
  const modoLectura = document.querySelector('.modo-lectura');
  const modoEdicion = document.querySelector('.modo-edicion');
  const accionesLectura = document.querySelector('.acciones-lectura');
  const accionesEdicion = document.querySelector('.acciones-edicion');
  const subirFotoBtn = document.querySelector('.subir-foto');
  const cancelarBtn = document.querySelector('.cancelar-edicion');

  editarBtn.addEventListener('click', function (e) {
    e.preventDefault();

    modoLectura.style.display = 'none';
    modoEdicion.style.display = 'block';
    accionesLectura.style.display = 'none';
    accionesEdicion.style.display = 'flex';
    subirFotoBtn.style.display = 'inline-block';

    document.body.classList.add('modo-edicion-activa');
  });

  cancelarBtn.addEventListener('click', function () {
    modoLectura.style.display = 'block';
    modoEdicion.style.display = 'none';
    accionesLectura.style.display = 'flex';
    accionesEdicion.style.display = 'none';
    subirFotoBtn.style.display = 'none';

    document.body.classList.remove('modo-edicion-activa');
  });
});
