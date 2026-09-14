/* Mide lamina por lamina si algo se sale, en vez de revisar 60 imagenes a ojo.
   Abre el HTML combinado en Chrome, deja que acomode todo, y compara la caja
   de cada elemento contra la de su lamina. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const S = process.cwd();
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].find((p) => fs.existsSync(p));

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
const html = fs.readFileSync(fuente, 'utf8');
const conSonda = html.replace('</head>', SONDA + '</head>');
const tmp = path.join(S, '_medir.html');
fs.writeFileSync(tmp, conSonda);

const dom = execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--allow-file-access-from-files',
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
