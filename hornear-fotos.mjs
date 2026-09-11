/* ============================================================
   Convierte las fotos de la oficina en fotos de carrusel, con el
   tratamiento ya "horneado" dentro del archivo.

   Por qué horneado y no con CSS: Canva importa el HTML pero no
   entiende filtros ni mezclas de color. Si el duotono vive en el
   CSS, en Canva sale la foto cruda. Si vive en el JPG, sale igual
   en Canva, en el PNG y en cualquier lado.

   Dos versiones por foto:
     tinta/<nombre>.jpg    1080x1350  duotono en el azul del logo,
                                     con la mitad de abajo fundida a
                                     azul casi negro para que el texto
                                     blanco se lea encima
     natural/<nombre>.jpg  1080x720   a color, apenas enfriada, para
                                     mostrar la oficina tal cual

   Uso:
     node hornear-fotos.mjs                  (usa la carpeta del sitio)
     node hornear-fotos.mjs ruta\a\carpeta   (otras fotos)

   Sin dependencias: usa el Chrome del sistema.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const ORIGEN = process.argv[2]
  || path.join(aqui, '..', 'GESG DESPACHO CONTABLE', 'images', 'oficina');
const DESTINO = path.join(aqui, 'marketing', 'fotos');

/* Nombre con significado -> archivo original. El nombre es lo que lee
   la rutina para escoger foto, así que dice qué se ve, no un número. */
const SELECCION = {
  'muro-logo':            'hero-fachada.jpg',   // muro de mármol con el logo GESG
  'sala-asesoria':        'oficina-07.jpg',     // mesa redonda, sillones, persianas azules
  'sala-asesoria-2':      'oficina-14.jpg',     // la misma sala, otro ángulo
  'recepcion':            'oficina-03.jpg',     // muro con logo, escritorios y sillón
  'area-trabajo':         'oficina-15.jpg',     // escritorios frente al muro del logo
  'area-trabajo-2':       'oficina-19.jpg',
  'despacho-privado':     'oficina-12.jpg',     // escritorio de vidrio y silla vino
  'escritorio-persianas': 'oficina-10.jpg',     // escritorio con persianas azules
  'persianas-azules':     'oficina-18.jpg',
  'oficina-luz':          'oficina-02.jpg',     // oficina blanca muy iluminada
  'escritorio-ventana':   'oficina-01.jpg',
};

const NAVEGADORES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];
const CHROME = NAVEGADORES.find((p) => fs.existsSync(p));
if (!CHROME) { console.error('  No encontré Chrome ni Edge.'); process.exit(1); }

fs.mkdirSync(path.join(DESTINO, 'tinta'), { recursive: true });
fs.mkdirSync(path.join(DESTINO, 'natural'), { recursive: true });
const temporal = fs.mkdtempSync(path.join(os.tmpdir(), 'hornear-'));

/* La página que hace el trabajo. Corre dentro de Chrome, dibuja la foto
   en un canvas, le aplica el tratamiento pixel por pixel y escribe el
   resultado como texto en el DOM, que es de donde lo leemos. */
function pagina(src) {
  return `<!DOCTYPE html><html><body><script>
const img = new Image();
img.onload = () => {
  function cubrir(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d');
    const s = Math.max(w / img.width, h / img.height);
    const dw = img.width * s, dh = img.height * s;
    x.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    return c;
  }

  // ---- tinta: duotono del azul casi negro al azul claro del logo ----
  const W = 1080, H = 1350;
  const t = cubrir(W, H), tx = t.getContext('2d');
  const d = tx.getImageData(0, 0, W, H), p = d.data;
  const A = [7, 18, 31];        // sombra: #07121F
  const B = [143, 178, 220];    // luz:    #8FB2DC
  const F = [11, 27, 46];       // fondo al que se funde: #0B1B2E
  for (let y = 0; y < H; y++) {
    // De 35% de la altura para abajo, se va fundiendo al fondo: ahí va
    // el titular y tiene que leerse en blanco sin depender de un CSS.
    const r = y / H;
    const funde = r < 0.35 ? 0 : Math.min(0.9, Math.pow((r - 0.35) / 0.65, 1.1) * 0.9);
    for (let xx = 0; xx < W; xx++) {
      const i = (y * W + xx) * 4;
      let l = (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) / 255;
      l = Math.pow(l, 1.3);                       // más contraste en las sombras
      l = Math.min(1, Math.max(0, (l - 0.06) * 1.12)) * 0.74;   // tope: nunca blanco
      let R = A[0] + (B[0] - A[0]) * l, G = A[1] + (B[1] - A[1]) * l, Bb = A[2] + (B[2] - A[2]) * l;
      p[i]     = R  + (F[0] - R)  * funde;
      p[i + 1] = G  + (F[1] - G)  * funde;
      p[i + 2] = Bb + (F[2] - Bb) * funde;
    }
  }
  tx.putImageData(d, 0, 0);

  // ---- natural: a color, apenas enfriada para que case con el azul ----
  const n = cubrir(1080, 720), nx = n.getContext('2d');
  const e = nx.getImageData(0, 0, 1080, 720), q = e.data;
  for (let i = 0; i < q.length; i += 4) {
    q[i]     = q[i] * 0.96;
    q[i + 2] = Math.min(255, q[i + 2] * 1.03 + 2);
  }
  nx.putImageData(e, 0, 0);

  document.body.innerHTML =
    '<pre id="t">' + t.toDataURL('image/jpeg', 0.84) + '</pre>' +
    '<pre id="n">' + n.toDataURL('image/jpeg', 0.86) + '</pre>';
};
img.onerror = () => { document.body.innerHTML = '<pre id="err">no cargo</pre>'; };
img.src = ${JSON.stringify(src)};
</script></body></html>`;
}

let bien = 0;
for (const [nombre, archivo] of Object.entries(SELECCION)) {
  const fuente = path.join(ORIGEN, archivo);
  if (!fs.existsSync(fuente)) { console.log(`  falta  ${archivo}`); continue; }

  const html = path.join(temporal, nombre + '.html');
  fs.writeFileSync(html, pagina('file:///' + fuente.replace(/\\/g, '/')));

  let salida = '';
  try {
    salida = execFileSync(CHROME, [
      '--headless=new', '--disable-gpu',
      // Sin esto la foto local "contamina" el canvas y no deja leer pixeles.
      '--allow-file-access-from-files',
      '--virtual-time-budget=15000',
      '--dump-dom',
      'file:///' + html.replace(/\\/g, '/'),
    ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 90000 });
  } catch (err) {
    console.log(`  falló  ${nombre} · ${err.message.split('\n')[0]}`);
    continue;
  }

  const sacar = (id) => {
    const m = salida.match(new RegExp('<pre id="' + id + '">data:image/jpeg;base64,([^<]+)</pre>'));
    return m ? Buffer.from(m[1], 'base64') : null;
  };
  const tinta = sacar('t'), natural = sacar('n');
  if (!tinta || !natural) { console.log(`  vacío  ${nombre}`); continue; }

  fs.writeFileSync(path.join(DESTINO, 'tinta', nombre + '.jpg'), tinta);
  fs.writeFileSync(path.join(DESTINO, 'natural', nombre + '.jpg'), natural);
  bien++;
  console.log(`  ok     ${nombre.padEnd(22)} tinta ${Math.round(tinta.length / 1024)} KB · natural ${Math.round(natural.length / 1024)} KB`);
}

fs.rmSync(temporal, { recursive: true, force: true });
console.log(`\n  ${bien} de ${Object.keys(SELECCION).length} fotos horneadas en ${DESTINO}\n`);
