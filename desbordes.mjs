/* Mide lamina por lamina si algo se sale, en vez de revisar 60 imagenes a ojo.
   Abre el HTML combinado en Chrome, deja que acomode todo, y compara la caja
   de cada elemento contra la de su lamina. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const S = process.cwd();
const CHROME = [
  process.env.CHROME,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => fs.existsSync(p));
if (!CHROME) {
  console.log('  no encontre Chrome. Pon la ruta en la variable CHROME.');
  process.exit(1);
}

/* Hay que medir DESPUES de que bajen la tipografia y las fotos: si se mide
   antes, el texto ocupa otro alto y el reporte sale distinto cada vez. */
const SONDA = `
<script>
function medir() {
  var salida = [];
  var laminas = document.querySelectorAll('.lamina');
  for (var i = 0; i < laminas.length; i++) {
    var L = laminas[i];
    var etq = '#' + i + ' ' + (L.getAttribute('data-label') || '');
    var caja = L.getBoundingClientRect();
    var est = getComputedStyle(L);
    var pd = parseFloat(est.paddingBottom) || 0;
    var pr = parseFloat(est.paddingRight) || 0;
    // Solo el texto que corre con el flujo. Los sellos, el pie, los marcos y
    // las palomitas van colocados a mano fuera de la caja a proposito.
    var hijos = L.querySelectorAll(
      'h1, h2, p.texto, p.subhook, p.frase, p.paso, p.rotulo, p.nota, ' +
      '.globo, .casilla, .cifra, .avance, .dice, .significa, .marco, .marco-foto'
    );
    for (var k = 0; k < hijos.length; k++) {
      var h = hijos[k];
      var pos = getComputedStyle(h).position;
      if (pos === 'absolute' || pos === 'fixed') continue;
      var c = h.getBoundingClientRect();
      if (c.width === 0 || c.height === 0) continue;
      var abajo = c.bottom - (caja.bottom - pd);
      var lado = c.right - (caja.right - pr);
      if (abajo > 1.5 || lado > 1.5) {
        salida.push(etq + ' | ' + h.tagName.toLowerCase() + '.' + (h.className || '-') +
          ' | abajo ' + Math.round(abajo) + 'px, lado ' + Math.round(lado) + 'px | ' +
          (h.textContent || '').trim().slice(0, 48));
      }
    }
  }
  // Si la letra buena o alguna foto no cargo, el reporte no vale: hay que decirlo.
  if (!document.fonts.check('16px Fraunces') || !document.fonts.check('16px Inter')) {
    salida.unshift('AVISO | no cargo la tipografia buena, esta medida no sirve');
  }
  var rotas = Array.prototype.slice.call(document.images)
    .filter(function (im) { return !im.complete || im.naturalWidth === 0; });
  if (rotas.length) {
    salida.unshift('AVISO | ' + rotas.length + ' fotos no cargaron, esta medida no sirve');
  }
  var m = document.createElement('div');
  m.id = 'REPORTE-DESBORDES';
  m.textContent = salida.length ? salida.join(' @@ ') : 'SIN DESBORDES';
  document.body.appendChild(m);
}

window.addEventListener('load', function () {
  var fotos = Array.prototype.slice.call(document.images).map(function (im) {
    return im.complete ? Promise.resolve() : new Promise(function (r) {
      im.addEventListener('load', r); im.addEventListener('error', r);
    });
  });
  Promise.all([document.fonts.ready].concat(fotos)).then(function () {
    // Un respiro para que el navegador rehaga el acomodo con la letra buena.
    setTimeout(medir, 400);
  });
});
</script>
`;

const fuente = process.argv[2] || path.join(S, 'todas.html');
let html = fs.readFileSync(fuente, 'utf8');

/* Las fotos se miden desde el disco, no desde GitHub: las del dia todavia no
   estan subidas y ademas asi el medidor no depende de la red. Si una foto no
   esta en la carpeta se deja la URL, para que se note que falta. */
const RAW = 'https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos/';
html = html.replace(new RegExp(RAW + '([a-z0-9-]+)/([a-z0-9-]+)\\.jpg', 'g'), (url, carpeta, foto) => {
  const local = path.join(S, 'marketing/fotos', carpeta, foto + '.jpg');
  return fs.existsSync(local) ? 'file:///' + local.replace(/\\/g, '/') : url;
});

const conSonda = html.replace('</head>', SONDA + '</head>');
const tmp = path.join(S, '_medir.html');
fs.writeFileSync(tmp, conSonda);

/* La tipografia sigue bajandose de Google Fonts, y en entornos con proxy hay
   que decirselo a Chrome o mide con la letra de repuesto y el reporte miente. */
const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy;

const dom = execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--allow-file-access-from-files',
  ...(PROXY ? ['--proxy-server=' + PROXY] : []),
  '--virtual-time-budget=20000', '--dump-dom', 'file:///' + tmp.replace(/\\/g, '/'),
], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 });

const m = dom.match(/id="REPORTE-DESBORDES"[^>]*>([\s\S]*?)<\/div>/);
if (!m) {
  console.log('  no pude leer el reporte (¿se cayo Chrome?)');
  process.exit(1);
}
const t = m[1].trim();
if (t === 'SIN DESBORDES') {
  console.log('  nada se sale de su lamina');
} else {
  const filas = t.split(' @@ ');
  console.log('  SE SALEN ' + filas.length + ':\n');
  for (const f of filas) console.log('  ' + f.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
}
