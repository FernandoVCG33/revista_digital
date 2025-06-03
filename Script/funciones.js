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
const botones = document.querySelectorAll('.componentes li');
const banner = document.querySelector('.banner');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const nuevaImagen = boton.getAttribute('data-image');
    banner.style.backgroundImage = nuevaImagen;
  });
});
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
