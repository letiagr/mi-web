/* ------------------------------------------------------------------
   DATOS DE LA WEB. Para cambiar un precio, una medida o marcar una obra
   como vendida, edita solo este archivo.

   estado: 'disponible' | 'no-disponible' | 'bajo-pedido'
   ------------------------------------------------------------------ */

const SITIO = {
  // Escribe aquí el correo que recibirá las consultas, por ejemplo 'hola@tudominio.com'.
  // Mientras esté vacío, el formulario envía a tus mensajes de Instagram.
  email: '',
  instagram: 'leticiadeamescua_art',
};

const SILENCIO = { acabado: 'Enmarcado', tecnica: 'Investigación matérica', coleccion: 'Silencio' };
const RUIDO = { acabado: 'Tablilla de madera enmarcada con papel verde oscuro', coleccion: 'Ruido' };

const OBRAS = [
  { ...SILENCIO, id: 'pliegue', nombre: 'Pliegue', ancho: 120, alto: 180, precio: 3500, estado: 'disponible',
    concepto: 'Delicadeza sostenida por un nudo constructivo',
    alt: 'Pliegue: superficie ocre con pliegues verticales, colgada en un muro gris' },
  { ...SILENCIO, id: 'soporte', nombre: 'Soporte', ancho: 100, alto: 120, precio: 1450, estado: 'disponible',
    concepto: 'Recoge el instante en que el muro se enfrenta a su viga estructural',
    alt: 'Soporte: superficie blanca rugosa atravesada por una línea horizontal oscura' },
  { ...SILENCIO, id: 'fisura', nombre: 'Fisura', ancho: 100, alto: 120, precio: 1450, estado: 'no-disponible',
    concepto: 'Tensión mínima de una fisura en el muro',
    alt: 'Fisura: superficie blanca con una fina grieta vertical' },
  { ...SILENCIO, id: 'encuentro', nombre: 'Encuentro', ancho: 100, alto: 120, precio: 1450, estado: 'no-disponible',
    concepto: 'Capas de tiempo depositadas con el paso del tiempo',
    alt: 'Encuentro: estratos horizontales de blanco a rosa' },
  { ...SILENCIO, id: 'junta', nombre: 'Junta', ancho: 100, alto: 120, precio: 1450, estado: 'no-disponible',
    concepto: 'La huella de un encuentro entre dos muros',
    alt: 'Junta: superficie naranja dividida por una junta vertical blanca en relieve' },
  { ...SILENCIO, id: 'contencion', nombre: 'Contención', ancho: 100, alto: 120, precio: 1450, estado: 'no-disponible',
    concepto: 'Desgaste sobre la piel del muro',
    alt: 'Contención: superficie terracota con marcas horizontales' },
  { ...SILENCIO, id: 'grieta', nombre: 'Grieta', ancho: 100, alto: 120, precio: 1450, estado: 'no-disponible',
    concepto: 'La materia se abre bajo el peso del tiempo',
    alt: 'Grieta: superficie color arena con una grieta vertical en relieve' },
  { ...SILENCIO, id: 'ejes', nombre: 'Serie Ejes', ancho: 80, alto: 100, precio: 650, porUnidad: true, estado: 'disponible',
    concepto: 'Cuatro piezas que funcionan como partes de un mismo sistema estructural. Cada cuadro representa un eje portante, una línea que sostiene, guía y organiza.',
    alt: 'Serie Ejes: cuatro lienzos blancos, cada uno con una banda negra en distinta posición' },
  { ...SILENCIO, id: 'veladura', nombre: 'Veladura', ancho: 80, alto: 100, precio: 650, estado: 'disponible',
    concepto: 'Evoca al movimiento de las telas, lonas que cubren andamios',
    alt: 'Veladura: superficie blanca con pliegues verticales y una línea negra a la izquierda' },
  { ...SILENCIO, id: 'velos-blanco', nombre: 'Serie Velos', variante: 'Blanco', ancho: 40, alto: 40, precio: 480, porUnidad: true, estado: 'disponible',
    concepto: 'El límite entre el muro y el aire',
    alt: 'Serie Velos en blanco: dos piezas cuadradas con veladuras verticales' },
  { ...SILENCIO, id: 'velos-amarillo', nombre: 'Serie Velos', variante: 'Amarillo', ancho: 40, alto: 40, precio: 480, porUnidad: true, estado: 'disponible',
    concepto: 'El límite entre el muro y el aire',
    alt: 'Serie Velos en amarillo: dos piezas cuadradas enmarcadas' },
  { ...SILENCIO, id: 'velos-oliva', nombre: 'Serie Velos', variante: 'Oliva', ancho: 40, alto: 40, precio: 480, porUnidad: true, estado: 'no-disponible',
    concepto: 'El límite entre el muro y el aire',
    alt: 'Serie Velos en verde oliva: dos piezas cuadradas enmarcadas' },
  { ...SILENCIO, id: 'velos-coral', nombre: 'Serie Velos', variante: 'Coral', ancho: 40, alto: 40, precio: 480, porUnidad: true, estado: 'disponible',
    concepto: 'El límite entre el muro y el aire',
    alt: 'Serie Velos en coral: dos piezas cuadradas enmarcadas' },

  { ...RUIDO, id: 'pause', nombre: 'Pause', ancho: 20, alto: 30, precio: 150, estado: 'disponible',
    alt: 'Pause: papel marrón arrugado con dos barras verticales verde oscuro' },
  { ...RUIDO, id: 'equal', nombre: 'Equal', ancho: 20, alto: 30, precio: 150, estado: 'disponible',
    alt: 'Equal: papel marrón arrugado con el signo igual en verde oscuro' },
  { ...RUIDO, id: 'plus', nombre: 'Plus', ancho: 20, alto: 30, precio: 150, estado: 'bajo-pedido',
    alt: 'Plus: papel marrón arrugado con el signo más en verde oscuro' },
  { ...RUIDO, id: 'fast-forward', nombre: 'Fast Forward', ancho: 20, alto: 30, precio: 150, estado: 'disponible',
    alt: 'Fast Forward: papel marrón arrugado con tres flechas en verde oscuro' },
];

/* Texto de cada colección, al pie de su catálogo */
const COLECCIONES = {
  silencio: {
    nombre: 'Silencio',
    texto: [
      'Silencio nace de una mirada atenta a los muros cuando un edificio se abre durante la obra. En ese instante aparecen las capas de su historia: pinturas superpuestas, grietas, materiales y huellas del tiempo. Un momento en el que la arquitectura se muestra desnuda, revelando la belleza de lo imperfecto y de lo vivido.',
      'Cada pieza de la colección se construye a partir de materiales propios de la obra y de procesos cercanos a los constructivos, respetando tiempos de secado y superposición de capas. Pequeños fragmentos de fachada convertidos en pintura, donde materia, tiempo y memoria quedan suspendidos en silencio.',
    ],
  },
  ruido: {
    nombre: 'Ruido',
    texto: [
      'En <em>Ruido</em> no pienso: <b>dejo salir</b>. Aquí la intuición manda y la forma se convierte en un lenguaje primario e inmediato. Trabajo con figuras simples, casi esenciales, que me ordenan el mundo y revelan mi manera de mirar: <b>directa, fuerte, estructurada</b>.',
      'Son composiciones que parecen impulsivas, pero están sostenidas por una lógica interna que es muy mía: <b>recta, clara, honesta</b>. Bajo el papel, entre veladuras y acrílico, <b>asoman las guías y geometrías milimétricas</b> que construyen cada símbolo: trazos precisos que ordenan el caos y hacen que la pieza respire fuerza.',
    ],
  },
};

/* Fotos extra de cada ficha, además de la del catálogo */
const SALA = 'en la exposición de Casa Chamberí';
const GALERIA = {
  pliegue: [{ src: 'sala/pliegue.jpg', alt: `Pliegue ${SALA}` }],
  soporte: [{ src: 'fondo/sala-grieta-soporte.jpg', pos: '63% 40%', alt: `Soporte junto a Grieta ${SALA}` }],
  grieta: [{ src: 'fondo/sala-grieta-soporte.jpg', pos: '38% 40%', alt: `Grieta junto a Soporte ${SALA}` }],
  fisura: [{ src: 'fondo/fisura-sala.jpg', pos: '30% 50%', alt: `Fisura ${SALA}` }],
  encuentro: [{ src: 'fondo/encuentro-sala.jpg', pos: '50% 25%', alt: `Encuentro ${SALA}` }],
  junta: [{ src: 'sala/junta.jpg', alt: `Junta ${SALA}` }, { src: 'fondo/textura-junta.jpg', alt: 'Detalle de la textura de Junta' }],
  contencion: [{ src: 'sala/contencion.jpg', alt: `Contención ${SALA}` }, { src: 'fondo/textura-contencion.jpg', alt: 'Detalle de la textura de Contención' }],
  'velos-blanco': [{ src: 'sala/velos-blanco.jpg', alt: `Serie Velos en blanco ${SALA}` }],
  'velos-amarillo': [{ src: 'sala/velos-amarillo.jpg', alt: `Serie Velos en amarillo ${SALA}` }],
  'velos-oliva': [{ src: 'sala/velos-oliva.jpg', alt: `Serie Velos en oliva ${SALA}` }],
  'velos-coral': [{ src: 'sala/velos-coral.jpg', alt: `Serie Velos en coral ${SALA}` }],
};

/* Press. Añade url: 'https://…' a cada revista para que su nombre sea un enlace. */
const PRENSA = [
  { nombre: 'El Mueble' },
  { nombre: 'Manera Magazine' },
  { nombre: 'AD' },
];
