/* Comportamiento común. Los contenidos editables están en datos.js */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IG = `https://www.instagram.com/${SITIO.instagram}/`;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');

  const euros = (n) => n.toLocaleString('es-ES', { useGrouping: 'always' }) + ' €';
  const precio = (o) => `${euros(o.precio)}${o.porUnidad ? ' / ud' : ''} + IVA`;
  const medidas = (o) => `${o.ancho} × ${o.alto} cm`;
  const titulo = (o) => (o.variante ? `${o.nombre} · ${o.variante}` : o.nombre);
  const ESTADOS = { disponible: 'Disponible', 'no-disponible': 'No disponible', 'bajo-pedido': 'Disponible bajo pedido' };

  /* Cabecera y pie ------------------------------------------------- */
  const NAV = [
    ['obra', 'obra.html', 'Obra'],
    ['biografia', 'biografia.html', 'Biografía'],
    ['press', 'prensa.html', 'Press'],
    ['contacto', 'contacto.html', 'Contacto'],
  ];
  const pagina = document.body.dataset.pagina;
  const enlaces = NAV.map(([id, href, txt]) =>
    `<a href="${href}"${id === pagina ? ' aria-current="page"' : ''}>${txt}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <a class="saltar" href="#contenido">Ir al contenido</a>
    <header class="cabecera">
      <a class="logo" href="index.html" aria-label="LA Art, inicio">
        <img class="logo-tinta" src="img/logo-tinta.png" alt="" width="281" height="218">
        <img class="logo-claro" src="img/logo-claro.png" alt="" width="281" height="218">
      </a>
      <button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu">Menú</button>
      <nav id="menu" class="nav" aria-label="Principal">${enlaces}</nav>
    </header>`);
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="pie">
      <img class="pie-logo" src="img/logo-tinta.png" alt="LA Art" width="281" height="218" loading="lazy">
      <p class="pie-lema">Materia | tiempo | silencio<br>Pieles que se transforman</p>
      <nav class="pie-nav" aria-label="Pie de página">${enlaces}</nav>
      <p class="pie-red">${SITIO.email ? `<a href="mailto:${SITIO.email}">${SITIO.email}</a><br>` : ''}<a href="${IG}" target="_blank" rel="noopener">@${SITIO.instagram}</a></p>
      <p class="pie-legal">© ${new Date().getFullYear()} Leticia de Amescua<br>Fotografías de Casa Chamberí: <a href="https://www.instagram.com/albavigaray/" target="_blank" rel="noopener">Alba Vigaray</a></p>
    </footer>`);

  const cabecera = $('.cabecera');
  const transparente = 'transparente' in document.body.dataset;
  const alScroll = () => cabecera.classList.toggle('con-fondo', scrollY > 40 || !transparente);
  addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  const botonMenu = $('.menu-boton');
  botonMenu.addEventListener('click', () => {
    const abierto = cabecera.classList.toggle('abierta');
    botonMenu.setAttribute('aria-expanded', abierto);
    botonMenu.textContent = abierto ? 'Cerrar' : 'Menú';
    document.body.classList.toggle('sin-scroll', abierto);
  });

  /* Fichas de obra ------------------------------------------------- */
  const ficha = (o) => `
    <a class="ficha ${o.coleccion === 'Ruido' ? 'ficha-ruido' : ''}" href="pieza.html?id=${o.id}">
      <span class="ficha-marco"><img src="img/obra/${o.id}.jpg" alt="${o.alt}" loading="lazy"></span>
      <span class="ficha-nombre">${titulo(o)}</span>
      <span class="ficha-dato">${medidas(o)}</span>
      <span class="ficha-dato">${o.estado === 'no-disponible' ? ESTADOS[o.estado] : precio(o)}</span>
      ${o.estado === 'bajo-pedido' ? `<span class="ficha-dato">${ESTADOS[o.estado]}</span>` : ''}
    </a>`;

  $$('[data-obras]').forEach((el) => {
    const [campo, valor] = el.dataset.obras.split(':');
    el.innerHTML = OBRAS.filter((o) => o[campo] === valor).map(ficha).join('');
  });

  /* Catálogo de una colección: cuadrícula de fichas iguales -------- */
  const catalogo = $('[data-catalogo]');
  if (catalogo) {
    const clave = new URLSearchParams(location.search).get('c') === 'ruido' ? 'ruido' : 'silencio';
    const col = COLECCIONES[clave];
    const otra = clave === 'ruido' ? 'silencio' : 'ruido';
    const obras = OBRAS.filter((o) => o.coleccion === col.nombre);
    if (clave === 'ruido') document.body.dataset.tema = 'ruido';
    document.title = `${col.nombre} | Leticia de Amescua`;
    const muestra = (o) => {
      const det = (GALERIA[o.id] || []).slice(-1)[0];
      const sello = o.estado === 'disponible' ? '' : `<span class="muestra-sello">${o.estado === 'bajo-pedido' ? 'Bajo pedido' : ESTADOS[o.estado]}</span>`;
      return `
      <a class="muestra${det ? ' con-detalle' : ''}" href="pieza.html?id=${o.id}">
        <span class="muestra-marco">
          <img src="img/obra/${o.id}.jpg" alt="${o.alt}" loading="lazy">
          ${det ? `<img class="muestra-detalle" src="img/${det.src}" alt="" loading="lazy"${det.pos ? ` style="object-position:${det.pos}"` : ''}>` : ''}
          ${sello}
        </span>
        <span class="muestra-nombre">${titulo(o)}</span>
        <span class="muestra-dato">${medidas(o)}${o.estado === 'no-disponible' ? '' : ` · ${precio(o)}`}</span>
      </a>`;
    };
    catalogo.innerHTML = `
      <header class="muestrario-cabeza">
        <h1 class="titulo">${col.nombre}</h1>
        <div class="muestrario-barra">
          <span>Colección · ${obras.length} obras</span>
          <a href="catalogo.html?c=${otra}">${COLECCIONES[otra].nombre} →</a>
        </div>
      </header>
      <div class="muestrario">${obras.map(muestra).join('')}</div>
      <section class="seccion rejilla coleccion-cabeza muestrario-texto revela">
        <p class="eyebrow">Sobre la colección</p>
        <div>
          <div class="lectura">${col.texto.map((t) => `<p>${t}</p>`).join('')}</div>
          <p class="muestrario-nota">Todos los precios son sin IVA. Para preguntar por una pieza o un encargo, escríbeme.</p>
          <a class="enlace" href="contacto.html">Contacto</a>
        </div>
      </section>`;
  }

  /* El carrusel de portada muestra la colección Silencio disponible */
  $$('[data-disponibles]').forEach((el) => {
    el.innerHTML = OBRAS.filter((o) => o.coleccion === 'Silencio' && o.estado === 'disponible').map(ficha).join('');
  });

  /* Carrusel --------------------------------------------------------*/
  $$('[data-carrusel]').forEach((zona) => {
    const pista = $('.carrusel', zona);
    const paso = () => { const f = $('.ficha', pista); return f ? f.offsetWidth + parseFloat(getComputedStyle(pista).columnGap || 0) : 300; };
    const [ant, sig] = [$('[data-ant]', zona), $('[data-sig]', zona)];
    const mover = (d) => pista.scrollBy({ left: d * paso(), behavior: reducido ? 'auto' : 'smooth' });
    ant.addEventListener('click', () => mover(-1));
    sig.addEventListener('click', () => mover(1));
    const estado = () => {
      ant.disabled = pista.scrollLeft < 4;
      sig.disabled = pista.scrollLeft + pista.clientWidth > pista.scrollWidth - 4;
    };
    pista.addEventListener('scroll', estado, { passive: true });
    addEventListener('resize', estado);
    estado();
  });

  /* Portada: diapositivas ---------------------------------------------*/
  const hero = $('.hero');
  if (hero) {
    const lamina = $$('.hero-lamina', hero);
    const cuenta = $('[data-cuenta]', hero);
    const pausa = $('[data-pausa]', hero);
    let i = 0, temporizador = null, enPausa = reducido;
    const ver = (n) => {
      i = (n + lamina.length) % lamina.length;
      lamina.forEach((l, k) => {
        l.classList.toggle('activa', k === i);
        l.toggleAttribute('inert', k !== i);
      });
      cuenta.textContent = `${pad(i + 1)} / ${pad(lamina.length)}`;
    };
    const parar = () => clearInterval(temporizador);
    const seguir = () => { parar(); if (!enPausa) temporizador = setInterval(() => ver(i + 1), 7000); };
    $('[data-ant]', hero).addEventListener('click', () => { ver(i - 1); seguir(); });
    $('[data-sig]', hero).addEventListener('click', () => { ver(i + 1); seguir(); });
    const pintarPausa = () => { pausa.textContent = enPausa ? 'Reanudar' : 'Pausa'; };
    pausa.addEventListener('click', () => { enPausa = !enPausa; pintarPausa(); seguir(); });
    hero.addEventListener('focusin', parar);
    hero.addEventListener('focusout', seguir);
    pintarPausa();
    ver(0);
    seguir();
  }

  /* Press ------------------------------------------------------------*/
  $$('[data-prensa]').forEach((el) => {
    el.innerHTML = PRENSA.map((p) => `<li>${p.url
      ? `<a href="${p.url}" target="_blank" rel="noopener">${p.nombre}</a>` : p.nombre}</li>`).join('');
  });

  /* Ficha individual ---------------------------------------------- */
  const pieza = $('[data-pieza]');
  if (pieza) {
    const id = new URLSearchParams(location.search).get('id');
    const n = OBRAS.findIndex((o) => o.id === id);
    if (n < 0) {
      pieza.innerHTML = `<div class="pieza-vacia"><h1>Esta obra no está en el catálogo.</h1><a class="enlace" href="obra.html">Ver toda la obra</a></div>`;
    } else {
      const o = OBRAS[n];
      const ant = OBRAS[(n - 1 + OBRAS.length) % OBRAS.length];
      const sig = OBRAS[(n + 1) % OBRAS.length];
      const extra = GALERIA[o.id] || [];
      document.title = `${titulo(o)} | Leticia de Amescua`;
      pieza.innerHTML = `
        <div class="pieza-imagen">
          <img src="img/obra/${o.id}.jpg" alt="${o.alt}">
          ${extra.map((f) => `<img src="img/${f.src}" alt="${f.alt}" loading="lazy">`).join('')}
        </div>
        <div class="pieza-texto">
          <p class="eyebrow">Colección ${o.coleccion}</p>
          <h1>${titulo(o)}</h1>
          ${o.concepto ? `<p class="pieza-concepto">${o.concepto}</p>` : ''}
          <dl class="tabla">
            <div><dt>Medidas${o.porUnidad ? ' por pieza' : ''}</dt><dd>${medidas(o)}</dd></div>
            <div><dt>Acabado</dt><dd>${o.acabado}</dd></div>
            ${o.tecnica ? `<div><dt>Técnica</dt><dd>${o.tecnica}</dd></div>` : ''}
            <div><dt>Precio</dt><dd>${precio(o)}</dd></div>
            <div><dt>Estado</dt><dd>${ESTADOS[o.estado]}</dd></div>
          </dl>
          <a class="enlace" href="contacto.html?obra=${o.id}">${o.estado === 'no-disponible' ? 'Consultar obra similar' : 'Solicitar información'}</a>
          ${alzado(o)}
        </div>
        <nav class="pieza-nav" aria-label="Otras obras">
          <a href="pieza.html?id=${ant.id}"><small>Anterior</small>${titulo(ant)}</a>
          <a href="catalogo.html?c=${o.coleccion.toLowerCase()}"><small>Catálogo</small>Colección ${o.coleccion}</a>
          <a href="pieza.html?id=${sig.id}"><small>Siguiente</small>${titulo(sig)}</a>
        </nav>`;
    }
  }

  /* Alzado a escala: 1 unidad = 1 cm, misma escala para todas las obras */
  function alzado(o) {
    const H = 250, m = 40, W = o.ancho + m * 2, suelo = H - 10;
    const y = suelo - 150 - o.alto / 2, x = m, f = y + o.alto, d = x + o.ancho;
    return `
      <figure class="alzado">
        <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"
             aria-label="Alzado esquemático: ${medidas(o)}, con el centro de la obra a 150 cm del suelo">
          <line x1="0" y1="${suelo}" x2="${W}" y2="${suelo}" class="al-suelo"/>
          <rect x="${x}" y="${y}" width="${o.ancho}" height="${o.alto}" class="al-obra"/>
          <line x1="${x}" y1="${y - 12}" x2="${d}" y2="${y - 12}" class="al-cota"/>
          <line x1="${x}" y1="${y - 16}" x2="${x}" y2="${y - 8}" class="al-cota"/>
          <line x1="${d}" y1="${y - 16}" x2="${d}" y2="${y - 8}" class="al-cota"/>
          <text x="${x + o.ancho / 2}" y="${y - 18}" text-anchor="middle">${o.ancho}</text>
          <line x1="${d + 12}" y1="${y}" x2="${d + 12}" y2="${f}" class="al-cota"/>
          <line x1="${d + 8}" y1="${y}" x2="${d + 16}" y2="${y}" class="al-cota"/>
          <line x1="${d + 8}" y1="${f}" x2="${d + 16}" y2="${f}" class="al-cota"/>
          <text x="${d + 20}" y="${y + o.alto / 2 + 3}">${o.alto}</text>
        </svg>
        <figcaption>Alzado · centro de la obra a 150 cm del suelo</figcaption>
      </figure>`;
  }

  /* Formulario ----------------------------------------------------- */
  const form = $('[data-form]');
  if (form) {
    const aviso = $('[data-aviso]', form);
    const q = new URLSearchParams(location.search);
    const pedida = OBRAS.find((o) => o.id === q.get('obra'));
    const MOTIVOS = {
      catalogo: 'Me gustaría recibir el catálogo actualizado.',
      cita: 'Me gustaría ver una obra en persona.',
    };
    if (pedida) form.elements.mensaje.value = `Me gustaría recibir información sobre ${titulo(pedida)}.`;
    else if (MOTIVOS[q.get('motivo')]) form.elements.mensaje.value = MOTIVOS[q.get('motivo')];
    const conCorreo = Boolean(SITIO.email);
    $('[data-enviar]', form).textContent = conCorreo ? 'Enviar por correo' : 'Enviar por Instagram';
    $('[data-nota]', form).innerHTML = conCorreo
      ? `Se abrirá tu correo con el mensaje preparado. También puedes escribir a <a href="mailto:${SITIO.email}">${SITIO.email}</a>.`
      : 'Copiamos tu mensaje y abrimos Instagram para que lo pegues.';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const asunto = pedida ? `Consulta · ${titulo(pedida)}` : 'Consulta desde la web';
      const cuerpo = `${d.get('mensaje')}\n\n${d.get('nombre')}\n${d.get('correo')}`;
      if (conCorreo) {
        location.href = `mailto:${SITIO.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        aviso.textContent = 'Se ha abierto tu correo con el mensaje preparado.';
        return;
      }
      let copiado = false;
      try { await navigator.clipboard.writeText(`${asunto}\n\n${cuerpo}`); copiado = true; } catch (_) { /* sin permiso */ }
      window.open(`https://ig.me/m/${SITIO.instagram}`, '_blank', 'noopener');
      aviso.textContent = copiado
        ? 'Mensaje copiado. Pégalo en la conversación de Instagram.'
        : 'Instagram se ha abierto en otra pestaña. Escribe allí tu mensaje.';
    });
  }

  /* Aparición lenta ------------------------------------------------ */
  const revelar = $$('.revela');
  if (reducido || !('IntersectionObserver' in window)) {
    revelar.forEach((el) => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px' });
    revelar.forEach((el) => io.observe(el));
  }
})();
