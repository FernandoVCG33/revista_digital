

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


/* === funciones.js === */

document.addEventListener("DOMContentLoaded", () => {

    // --- LÓGICA PARA INDEX.HTML ---
    // Verificamos si existe un elemento que solo esté en index.html, por ejemplo, el ID 'fecha'
    if (document.getElementById("fecha")) {
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
        setInterval(actualizarEvento, 2900);
    }

    // --- LÓGICA PARA INFORMACION.HTML ---
    // Verificamos si la página tiene la clase 'modo-informacion' en el body
    if (document.body.classList.contains("modo-informacion")) {

        /*inicio banner evento especifico */
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
        /*fin banner evento especifico */


        /*INICIO informacion.html */
        const header = document.querySelector(".tambo-header");
        const heroCarrusel = document.querySelector(".evento-hero-carrusel");

        function verificarTransparencia() {
            if (!heroCarrusel || !header) return; // Asegúrate de que los elementos existen
            const heroBottom = heroCarrusel.getBoundingClientRect().bottom;
            if (heroBottom <= 1050) {
                header.classList.add("header-solido");
            } else {
                header.classList.remove("header-solido");
            }
        }

        if (heroCarrusel && header) { // Solo añadir listeners si los elementos existen
            window.addEventListener("scroll", verificarTransparencia);
            verificarTransparencia();
        }


        const hero = document.querySelector(".evento-hero-carrusel");

        const ajustarHeader = () => {
            if (!header || !hero) return; // Asegúrate de que los elementos existen
            if (window.scrollY > hero.offsetHeight - 100) {
                header.classList.remove("header-transparente");
                header.style.borderBottom = "5px solid #4C2634"; // vuelve el borde
            } else {
                header.classList.add("header-transparente");
                header.style.borderBottom = "none"; // quita el borde
            }
        };

        if (header && hero) { // Solo añadir listeners si los elementos existen
            window.addEventListener("scroll", ajustarHeader);
            ajustarHeader(); // Ejecuta una vez al cargar
        }


        const activos = document.querySelectorAll(".columna-indice li.activo");
        if (activos.length > 0) {
            const observerIndex = new IntersectionObserver((entries) => { // Renombrado para evitar conflicto
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("encendido");
                    }
                });
            }, {
                threshold: 0.5
            });
            activos.forEach(activo => observerIndex.observe(activo));
        }

        const frase = document.querySelector(".frase-final");
        if (frase) { // Solo si la frase existe
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

            function animarLetras() {
                spans.forEach((span, i) => {
                    setTimeout(() => {
                        span.classList.add("relleno");
                    }, i * 50);
                });
            }

            const observerFrase = new IntersectionObserver((entries, obs) => { // Renombrado para evitar conflicto
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animarLetras();
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observerFrase.observe(frase);
        }

        const commentsSection = document.getElementById('comments-section');
        const openPopupButton = document.getElementById('open-comment-popup');

        // Solo inicializar el pop-up si los elementos base existen en esta página
        if (commentsSection || openPopupButton) {
            const commentPopup = document.getElementById('comment-popup');
            const closePopupButton = document.getElementById('close-comment-popup');
            let overlay;

            function showOverlay() {
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.classList.add('overlay');
                    document.body.appendChild(overlay);
                    overlay.addEventListener('click', closePopup);
                }
                overlay.style.display = 'block';
            }

            function hideOverlay() {
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }

            function openPopup() {
                if (commentPopup) { // Asegúrate de que el pop-up existe
                    commentPopup.style.display = 'flex';
                    showOverlay();
                    document.body.style.overflow = 'hidden';
                }
            }

            function closePopup() {
                if (commentPopup) { // Asegúrate de que el pop-up existe
                    commentPopup.style.display = 'none';
                    hideOverlay();
                    document.body.style.overflow = '';
                }
            }

            if (openPopupButton) {
                openPopupButton.addEventListener('click', openPopup);
            }
            if (closePopupButton) {
                closePopupButton.addEventListener('click', closePopup);
            }

            if (commentsSection) {
                const observerComments = new IntersectionObserver((entries, observer) => { // Renombrado para evitar conflicto
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            openPopup();
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5
                });
                observerComments.observe(commentsSection);
            }
        }
        /*FIN informacion.html */
    }
});

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


/*EVENTO*/


document.addEventListener('DOMContentLoaded', () => {
  const btnAplicar = document.querySelector('.btn_aplicar');
  
  if (!btnAplicar) return;

  btnAplicar.addEventListener('click', () => {
    const tiposSeleccionados = [...document.querySelectorAll('.filtro_agenda input[type=checkbox]')]
      .filter(chk => chk.checked && ["Teatro", "Exposiciones", "Danza", "Música"].includes(chk.value))
      .map(chk => chk.value);

    const fechasSeleccionadas = [...document.querySelectorAll('.filtro_agenda input[type=checkbox]')]
      .filter(chk => chk.checked && ["esta_semana", "este_mes", "proximo_mes"].includes(chk.value))
      .map(chk => chk.value);

    function cumpleFiltroFecha(fechaEventoStr) {
      if (!fechaEventoStr || fechasSeleccionadas.length === 0) return true;

      const hoy = new Date();
      const fechaEvento = new Date(fechaEventoStr);

      for (const filtro of fechasSeleccionadas) {
        if (filtro === "esta_semana") {
          const inicioSemana = new Date(hoy);
          inicioSemana.setDate(hoy.getDate() - hoy.getDay());
          const finSemana = new Date(inicioSemana);
          finSemana.setDate(inicioSemana.getDate() + 6);
          if (fechaEvento >= inicioSemana && fechaEvento <= finSemana) return true;
        }
        if (filtro === "este_mes") {
          if (fechaEvento.getMonth() === hoy.getMonth() &&
              fechaEvento.getFullYear() === hoy.getFullYear()) return true;
        }
        if (filtro === "proximo_mes") {
          const proximo = new Date(hoy);
          proximo.setMonth(hoy.getMonth() + 1);
          if (fechaEvento.getMonth() === proximo.getMonth() &&
              fechaEvento.getFullYear() === proximo.getFullYear()) return true;
        }
      }
      return false;
    }

    const eventos = document.querySelectorAll('.event-card-frame');

    eventos.forEach(evento => {
      const tipoEvento = evento.getAttribute('data-type');
      const fechaEvento = evento.getAttribute('data-date');

      const tipoOk = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(tipoEvento);
      const fechaOk = cumpleFiltroFecha(fechaEvento);

      evento.style.display = (tipoOk && fechaOk) ? '' : 'none';
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const eventosData = [
{
  "id": 1,
  "tipo": "Música",
  "fecha": "2025-06-21",
  "titulo": "Pánico",
  "artista": "Manuel García",
  "categoria": "Música",
  "diaNumero": "21",
  "mesNombre": "Mayo",
  "diaSemana": "Miercoles",
  "lugar": "Teatro Municipal",
  "hora": "19:00",
  "edad": "+8 años",
  "imagen": "imagenes/cardpanico.png",
  "enlace": "informacion.html"
},
{
  "id": 2,
  "tipo": "Música",
  "fecha": "2025-07-02",
  "titulo": "Armadura",
  "artista": "Ecos del Metal",
  "categoria": "Música",
  "diaNumero": "02",
  "mesNombre": "Junio",
  "diaSemana": "Lunes",
  "lugar": "Teatro Municipal",
  "hora": "20:00",
  "edad": "+12 años",
  "imagen": "imagenes/cardarma.jpg",
  "enlace": "informacion.html"
},
{
  "id": 3,
  "tipo": "Música",
  "fecha": "2025-07-01",
  "titulo": "Ritmos del ande",
  "artista": "Altiplano",
  "categoria": "Música",
  "diaNumero": "01",
  "mesNombre": "Junio",
  "diaSemana": "Domingo",
  "lugar": "Teatro Nuna",
  "hora": "19:30",
  "edad": "+12 años",
  "imagen": "imagenes/cardritmos.jpg",
  "enlace": "altiplano.html"
},      
{
  "id": 4,
  "tipo": "Música",
  "fecha": "2025-07-27",
  "titulo": "El Pesanervios XXV",
  "artista": "Grillo Villegas",
  "categoria": "Música",
  "diaNumero": "27",
  "mesNombre": "Junio",
  "diaSemana": "Viernes",
  "lugar": "Chuquiago Marka",
  "hora": "20:00",
  "edad": "+8 años",
  "imagen": "imagenes/cardpasa.jpg",
  "enlace": "Pesanervios.html"
},
{
  "id": 5,
  "tipo": "Danza",
  "fecha": "2025-06-01",
  "titulo": "Danzaría",
  "artista": "",
  "categoria": "Danza",
  "diaNumero": "01",
  "mesNombre": "Junio",
  "diaSemana": "Domingo",
  "lugar": "Espacio Kúu Inti",
  "hora": "17:00",
  "edad": "Todo público",
  "imagen": "imagenes/carddanza.jpg",
  "enlace": "evento_7.html"
},
{
  "id": 6,
  "tipo": "Danza",
  "fecha": "2025-07-07",
  "titulo": "Dream On",
  "artista": "Play Pole Dance & Danza Aérea",
  "categoria": "Danza",
  "diaNumero": "07",
  "mesNombre": "Junio",
  "diaSemana": "Sábado",
  "lugar": "Teatro Nuna",
  "hora": "19:30",
  "edad": "+8 años",
  "imagen": "imagenes/carddream.png",
  "enlace": "dream_on.html"
},
{
  "id": 7,
  "tipo": "Exposiciones",
  "fecha": "2025-07-02",
  "titulo": "Crianza Mutua",
  "artista": "Elvira Espejo",
  "categoria": "Exposición",
  "diaNumero": "",
  "mesNombre": "Lunes a Viernes",
  "diaSemana": "",
  "lugar": "Museo MUSEF",
  "hora": "8:30",
  "edad": "Todo Público",
  "imagen": "imagenes/cardcrian.png",
  "enlace": "vistiendomemorias.html"
},
{
  "id": 8,
  "tipo": "Exposiciones",
  "fecha": "2025-07-02",
  "titulo": "Vivassonoridades",
  "artista": "",
  "categoria": "Exposición",
  "diaNumero": "",
  "mesNombre": "Lunes a Viernes",
  "diaSemana": "",
  "lugar": "Museo MUSEF",
  "hora": "8:30",
  "edad": "Todo Público",
  "imagen": "imagenes/cardsono.png",
  "enlace": "vivas_sonoridades.html"
},                      
{
  "id": 9,
  "tipo": "Teatro",
  "fecha": "2025-07-26",
  "titulo": "Cholicienta",
  "artista": "Elenco artístico Laude",
  "categoria": "Teatro",
  "diaNumero": "26",
  "mesNombre": "Junio",
  "diaSemana": "Jueves",
  "lugar": "Teatro 6 de Agosto",
  "hora": "19:00",
  "edad": "+8 años",
  "imagen": "imagenes/cardcholi.png",
  "enlace": "chococienta.html"
}, 
{
  "id": 10,
  "tipo": "Teatro",
  "fecha": "2025-07-13",
  "titulo": "Mentiras Drags",
  "artista": "",
  "categoria": "Teatro",
  "diaNumero": "13",
  "mesNombre": "Junio",
  "diaSemana": "Viernes",
  "lugar": "Teatro Municipal",
  "hora": "19:30",
  "edad": "+12 años",
  "imagen": "imagenes/cardmentira.png",
  "enlace": "mentirasdrags.html"
}
  ];

  const track = document.querySelector('.carousel-track');
  if (!track) {
    console.warn("No se encontró");
    return;
  }

  eventosData.forEach(evento => {
    const card = document.createElement('div');
    card.classList.add('event-card-frame');
    card.setAttribute('data-type', evento.tipo);
    card.setAttribute('data-date', evento.fecha);

  card.innerHTML = `
    <p class="event-title-details">
      <span class="event-title-panic">${evento.titulo}<br /></span>
      <span class="event-artist-music">Con: ${evento.artista}<br />${evento.categoria}<br /></span>
    </p>
    <div class="event-details-overlap" style="background-image: url('${evento.imagen}');">
      <div class="event-date-info">
        <div class="event-day-number-wrapper">
          <div class="event-day-number">${evento.diaNumero}</div>
        </div>
        <div class="event-date-group">
          <div class="event-month-day">
            <div class="event-month-wrapper">
              <div class="event-month-inner-wrapper">
              </div>
            </div>
            <div class="event-date-text-wrapper">
              <div class="event-date-text">
                <div class="event-month-text">${evento.mesNombre}</div>
              </div>
            </div>
          </div>
          <div class="event-weekday-wrapper">
            <div class="event-weekday-name">${evento.diaSemana}</div>
          </div>
        </div>
      </div>
      <div class="event-location-time">
        <div class="event-venue">${evento.lugar}</div>
        <div class="event-time">${evento.hora}</div>
      </div>
      <div class="event-age-restriction">${evento.edad}</div>
    </div>
    <div class="event-button" onclick="location.href='${evento.enlace}'">Ir a evento</div>
  `;

    track.appendChild(card);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  let scrollAmount = 0;
  const scrollStep = 320;

  prevButton.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    track.style.transform = `translateX(-${scrollAmount}px)`;
  });

  nextButton.addEventListener('click', () => {
    scrollAmount += scrollStep;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    track.style.transform = `translateX(-${scrollAmount}px)`;
  });
});



