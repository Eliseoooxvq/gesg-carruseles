/* Arma los carruseles de 10 laminas a partir de lo que escribieron los agentes.
   La portada y el cierre se conservan (solo se les cambia el texto); las ocho
   interiores se generan desde cero con la plantilla de cada estilo, para poder
   repartir tonos, marcos de foto y folios.

   Uso:  node expandir.mjs detalle.json [--probar]
*/
import fs from 'node:fs';
import path from 'node:path';

const DIR = process.env.CARR_DIR || './marketing/carruseles/' + new Date().toISOString().slice(0,10);
const S = process.cwd();
const RAW = 'https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos';

const FUENTE = process.argv.find((a) => a.endsWith('.json')) || 'detalle.json';
const PROBAR = process.argv.includes('--probar');
const datos = JSON.parse(fs.readFileSync(path.join(S, FUENTE), 'utf8'));

const TOTAL = 10;          // laminas por carrusel
const INTERIORES = 8;      // de la 2 a la 9

/* --- utilidades --------------------------------------------------------- */

const limpiar = (t) =>
  String(t == null ? '' : t)
    .replace(/&lt;(\/?)(b|em|br|i)&gt;/g, '<$1$2>')
    .replace(/&amp;(middot|nbsp|hellip);/g, '&$1;');

const titulo = (t) => {
  const r = limpiar(t).split('|').map((x) => x.trim()).filter(Boolean);
  if (r.length <= 1) return r[0] || '';
  return r.slice(0, -1).join('<br>') + '<br><em>' + r[r.length - 1] + '</em>';
};

const cifra = (t) => {
  const m = limpiar(t).trim().match(/^(.+?)\s*(%)$/);
  return m ? m[1] + '<small>%</small>' : limpiar(t).trim();
};

const folio = (n) => String(n).padStart(2, '0') + ' / ' + TOTAL;

// Saca los campos de una lamina en un objeto suelto.
const mapa = (campos) => {
  const o = {};
  for (const { campo, texto } of campos || []) o[campo] = limpiar(texto);
  return o;
};

/* --- fotos: se reparten sin repetir dentro del mismo carrusel ------------ */

const FOTOS = [
  ['muro-logo', 'Muro del despacho de GESG en Chiautempan'],
  ['recepcion', 'Recepción de GESG en Chiautempan'],
  ['escritorio-persianas', 'Escritorio de GESG en Chiautempan'],
  ['sala-asesoria', 'Sala de asesoría de GESG'],
  ['area-trabajo', 'Área de trabajo de GESG'],
  ['oficina-luz', 'Oficina de GESG con luz de ventana'],
  ['persianas-azules', 'Oficina de GESG con persianas azules'],
  ['escritorio-ventana', 'Escritorio junto a la ventana en GESG'],
  ['despacho-privado', 'Despacho privado de GESG'],
  ['sala-asesoria-2', 'Sala de asesoría de GESG'],
  ['area-trabajo-2', 'Área de trabajo de GESG'],
];

function marco(idx, bajo) {
  const [f, alt] = FOTOS[idx % FOTOS.length];
  return '<div class="marco' + (bajo ? ' bajo' : '') + '"><span class="marco-fondo"></span>' +
    '<img src="' + RAW + '/natural/' + f + '.jpg" alt="' + alt + '"></div>';
}

/* --- plantillas por estilo ---------------------------------------------- */

const VIAS = ['En trámite', 'En revisión', 'En trámite', 'Advertencia', 'En revisión', 'Advertencia', 'Urgente', 'Urgente'];

function pie(area, n) {
  return '<div class="pie"><span><b>GESG</b> &middot; ' + area + '</span><span class="folio">' + folio(n) + '</span></div></section>';
}

const PLANTILLA = {
  expediente: (c, k, n, tono, foto) =>
    '<section class="lamina v-expediente ' + tono + '" data-document-role="page" data-label="L' + n + '">\n' +
    '<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">' + VIAS[k] + '</span></div>\n' +
    (foto === null ? '' : marco(foto) + '\n') +
    '<div class="hueco"><p class="paso">' + c.paso + '</p><h2>' + titulo(c.h2) + '</h2>' +
    (c.texto ? '<p class="texto">' + c.texto + '</p>' : '') + '</div>\n' +
    '<div class="perfil"></div>' + pie(c.area, n),

  chat: (c, k, n, tono, foto) =>
    '<section class="lamina v-chat oscura" data-document-role="page" data-label="L' + n + '">\n' +
    '<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; ' + c.area + '</b><span>en línea</span></div></div>\n' +
    '<div class="hilo">\n' +
    (c.entra ? '<div class="globo entra">' + c.entra + '</div>\n' : '') +
    (c.sale ? '<div class="globo sale">' + c.sale + '</div>\n' : '') +
    '</div>\n' +
    (foto === null ? '' : marco(foto, true) + '\n') +
    '<div class="hueco"><p class="paso">' + c.paso + '</p><h2>' + titulo(c.h2) + '</h2></div>\n' +
    pie(c.area, n),

  oficio: (c, k, n, tono, foto) =>
    '<section class="lamina v-oficio ' + tono + '" data-document-role="page" data-label="L' + n + '">\n' +
    '<p class="rotulo"><span class="raya"></span><span>' + c.rotulo + '</span></p>\n' +
    (foto === null ? '' : marco(foto) + '\n') +
    (c.cita ? '<div class="dice"><span class="etiqueta">Lo que dice tu papel</span><p class="frase">' + c.cita + '</p></div>\n' : '') +
    '<div class="significa"><span class="etiqueta">' + (c.cita ? 'Qué te está diciendo' : 'Lo que pasó') + '</span>' +
    '<p class="frase">' + c.traduccion + '</p></div>\n' +
    pie(c.area, n),

  lista: (c, k, n, tono, foto) =>
    '<section class="lamina v-lista clara" data-document-role="page" data-label="L' + n + '">\n' +
    '<div class="avance"><span>' + c.paso + '</span><span>de ' + INTERIORES + '</span></div>' +
    '<div class="barra-avance"><span style="width:' + Math.round((k + 1) / INTERIORES * 100) + '%"></span></div>\n' +
    (foto === null ? '' : marco(foto, true) + '\n') +
    '<div class="caja-grande"><span class="palomita-a"></span><span class="palomita-b"></span></div>\n' +
    '<h2>' + titulo(c.h2) + '</h2>' + (c.texto ? '<p class="texto">' + c.texto + '</p>' : '') + '\n' +
    pie(c.area, n),

  dato: (c, k, n, tono, foto) =>
    '<section class="lamina v-dato ' + tono + ' interior" data-document-role="page" data-label="L' + n + '">\n' +
    '<p class="rotulo"><span class="raya"></span><span>' + c.rotulo + '</span></p>\n' +
    (foto === null ? '' : marco(foto, true) + '\n') +
    (c.cifra ? '<div class="cifra">' + cifra(c.cifra) + '</div>\n' : '') +
    '<h2>' + titulo(c.h2) + '</h2>' + (c.texto ? '<p class="texto">' + c.texto + '</p>' : '') + '\n' +
    pie(c.area, n),

  foto: (c, k, n, tono, foto) =>
    '<section class="lamina v-foto ' + tono + ' interior" data-document-role="page" data-label="L' + n + '">\n' +
    '<div class="regla-v"></div>\n' +
    '<div class="abajo"><p class="paso">' + c.paso + '</p><h2>' + titulo(c.h2) + '</h2>' +
    (c.texto ? '<p class="texto">' + c.texto + '</p>' : '') + '</div>\n' +
    pie(c.area, n),
};

/* Tono de cada interior, por estilo. La portada y el cierre no se tocan. */
const TONOS = {
  expediente: (k) => (k % 2 === 0 ? 'clara' : 'oscura'),
  chat: () => 'oscura',
  oficio: (k) => (k % 2 === 0 ? 'clara' : 'oscura'),
  lista: () => 'clara',
  dato: (k) => (k % 2 === 0 ? 'oscura' : 'clara'),
  foto: (k) => (k % 2 === 0 ? 'oscura' : 'clara'),
};

/* En que interiores va foto (indice de 0 a 7). El estilo foto no lleva marcos
   adentro: su foto va a sangre en portada y cierre. */
const CON_FOTO = { expediente: [1, 5], chat: [2, 6], oficio: [1, 5], lista: [2, 6], dato: [1, 5], foto: [] };

/* --- los campos de la portada y del cierre, que si se conservan ---------- */

function entre(sec, abre, cierra, nuevo, cual = 0) {
  let a = -1;
  for (let i = 0; i <= cual; i++) { a = sec.indexOf(abre, a + 1); if (a < 0) return null; }
  const b = sec.indexOf(cierra, a + abre.length);
  if (b < 0) return null;
  return sec.slice(0, a + abre.length) + nuevo + sec.slice(b);
}

const PONER = {
  h1: (s, t) => entre(s, '<h1>', '</h1>', titulo(t)),
  h2: (s, t) => entre(s, '<h2>', '</h2>', titulo(t)),
  subhook: (s, t) => entre(s, '<p class="subhook">', '</p>', t),
  paso: (s, t) => entre(s, '<p class="paso">', '</p>', t),
  texto: (s, t) => entre(s, '<p class="texto">', '</p>', t),
  cifra: (s, t) => entre(s, '<div class="cifra">', '</div>', cifra(t)),
  rotulo: (s, t) => entre(s, '<span class="raya"></span><span>', '</span>', t, 0),
  pie: (s, t) => entre(s, '<span class="raya"></span><span>', '</span>', t, 1),
  marcado: (s, t) => entre(s, '<p class="marcado"><span>', '</span>', t),
  cita: (s, t) => entre(s, '<p class="frase">', '</p>', t, 0),
  traduccion: (s, t) => entre(s, '<p class="frase">', '</p>', t, 1),
  sale: (s, t) => entre(s, '<div class="globo sale">', '</div>', t),
  entra: (s, t) => {
    const a = s.indexOf('<div class="globo entra">');
    if (a < 0) return null;
    const b = s.indexOf('</div>', a);
    const h = s.slice(a, b).match(/<span class="hora">[\s\S]*?<\/span>/);
    return s.slice(0, a + 25) + t + (h ? h[0] : '') + s.slice(b);
  },
  casilla1: (s, t) => entre(s, '<span class="caja"></span><span>', '</span>', t, 0),
  casilla2: (s, t) => entre(s, '<span class="caja"></span><span>', '</span>', t, 1),
  casilla3: (s, t) => entre(s, '<span class="caja"></span><span>', '</span>', t, 2),
};

function rellenar(sec, campos, quien) {
  for (const { campo, texto } of campos || []) {
    const fn = PONER[campo];
    if (!fn) { avisos.push(quien + ' campo desconocido: ' + campo); continue; }
    const nueva = fn(sec, limpiar(texto));
    if (nueva === null) { avisos.push(quien + ' no cupo: ' + campo); continue; }
    sec = nueva;
  }
  return sec;
}

/* --- armar ------------------------------------------------------------- */

const avisos = [];
let hechos = 0;

for (const c of datos.carruseles) {
  const ruta = path.join(DIR, c.archivo);
  const html = fs.readFileSync(ruta, 'utf8');

  const secs = html.match(/<section[\s\S]*?<\/section>/g) || [];
  const cabeza = html.slice(0, html.indexOf(secs[0]));
  const cola = html.slice(html.lastIndexOf('</section>') + 10);
  const area = (html.match(/<b>GESG<\/b> &middot; ([^<]*)</) || [])[1] || 'Contabilidad';

  // Portada y cierre se conservan tal cual, solo con texto nuevo.
  let portada = rellenar(secs[0], c.portada.campos, c.n + ' portada');
  portada = portada.replace(/<span class="folio">[^<]*<\/span>/, '<span class="folio">' + folio(1) + '</span>');

  let cierre = rellenar(secs[secs.length - 1], c.cierre.campos, c.n + ' cierre');
  cierre = cierre.replace(/<span class="folio">[^<]*<\/span>/, '<span class="folio">' + folio(TOTAL) + '</span>');
  cierre = cierre.replace(/data-label="L\d+ cierre"/, 'data-label="L' + TOTAL + ' cierre"');

  // Las ocho interiores, nuevas.
  const hazla = PLANTILLA[c.estilo];
  const tono = TONOS[c.estilo];
  const conFoto = CON_FOTO[c.estilo];
  let cuantasFotos = 0;

  const interiores = c.laminas.slice(0, INTERIORES).map((l, k) => {
    const campos = mapa(l.campos);
    campos.area = area;
    if (!campos.paso && campos.rotulo) campos.paso = campos.rotulo;
    if (!campos.rotulo && campos.paso) campos.rotulo = campos.paso;
    const foto = conFoto.includes(k) ? (Number(c.n) * 3 + cuantasFotos++) : null;
    return hazla(campos, k, k + 2, tono(k), foto);
  });

  if (interiores.length < INTERIORES) avisos.push(c.n + ' solo trajo ' + interiores.length + ' interiores');

  const nuevo = cabeza + portada + '\n\n' + interiores.join('\n\n') + '\n\n' + cierre + cola;
  if (!PROBAR) fs.writeFileSync(ruta, nuevo);
  hechos++;
}

console.log('  carruseles armados a ' + TOTAL + ' laminas: ' + hechos);
if (avisos.length) {
  console.log('\n  --- avisos ---');
  for (const a of avisos) console.log('  ' + a);
} else {
  console.log('  sin avisos');
}

/* --- control de topes --------------------------------------------------- */

const TOPE_ROTULO = 26;
console.log('\n  --- renglones que pasan el tope ---');
let largos = 0;
for (const c of datos.carruseles) {
  const html = fs.readFileSync(path.join(DIR, c.archivo), 'utf8');
  for (const sec of html.match(/<section[\s\S]*?<\/section>/g) || []) {
    if (sec.includes('cierre')) continue;
    const et = (sec.match(/data-label="([^"]*)"/) || [])[1];
    const m = sec.match(/<h[12]>([\s\S]*?)<\/h[12]>/);
    if (m) {
      for (const l of m[1].split('<br>').map((x) => x.replace(/<[^>]+>/g, '').trim())) {
        if (l.length > c.tope) { console.log('  ' + c.n + ' ' + et + '  titulo ' + l.length + '/' + c.tope + '  ' + l); largos++; }
      }
    }
    for (const p of sec.match(/<p class="paso">([^<]*)<\/p>|<div class="avance"><span>([^<]*)<\/span>/g) || []) {
      const t = p.replace(/<[^>]+>/g, '');
      if (t.length > TOPE_ROTULO) { console.log('  ' + c.n + ' ' + et + '  rotulo ' + t.length + '/' + TOPE_ROTULO + '  ' + t); largos++; }
    }
  }
}
if (!largos) console.log('  ninguno');
