/* ============================================================
   Convierte el HTML diario de carruseles en PNG, uno por lámina.

   No hace falta instalar nada: usa el Chrome que ya está en la
   máquina en modo sin ventana. Playwright o Puppeteer harían lo
   mismo pero bajan un navegador entero de ~150 MB, y aquí no
   hace falta.

   Uso:
     node renderizar.mjs ruta\al\archivo.html
     node renderizar.mjs                        (toma el más reciente de .\entradas)

   Las imágenes salen en .\salida\<fecha>\ a 1080x1350.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ANCHO = 1080;
const ALTO = 1350;

const NAVEGADORES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const rojo = (s) => `\x1b[31m${s}\x1b[0m`;
const verde = (s) => `\x1b[32m${s}\x1b[0m`;
const gris = (s) => `\x1b[2m${s}\x1b[0m`;

function navegador() {
  const n = NAVEGADORES.find((p) => fs.existsSync(p));
  if (!n) {
    console.error(rojo('  No encontré Chrome ni Edge. Instala uno de los dos.'));
    process.exit(1);
  }
  return n;
}

/* Toma el HTML del día y lo parte en una página por lámina.
   Cada lámina se guarda como su propio archivo con el mismo
   <head>, para que Chrome la fotografíe sola y quede exacta. */
function partir(html) {
  const cabeza = (html.match(/<head>([\s\S]*?)<\/head>/i) || [, ''])[1];
  const laminas = html.match(/<section class="lamina[\s\S]*?<\/section>/g) || [];
  const titulos = [...html.matchAll(/<h3 class="titulo-carrusel">([\s\S]*?)<\/h3>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  return { cabeza, laminas, titulos };
}

/* Nombre de archivo legible y ordenable: 03-defensa-fiscal-05.png */
function nombrar(titulo, indiceCarrusel, indiceLamina) {
  const limpio = (titulo || `carrusel-${indiceCarrusel + 1}`)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 52);
  return `${String(indiceCarrusel + 1).padStart(2, '0')}-${limpio}-${String(indiceLamina + 1).padStart(2, '0')}.png`;
}

function masReciente(dir) {
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).filter((x) => x.endsWith('.html'))
    .map((x) => ({ x, t: fs.statSync(path.join(dir, x)).mtimeMs }))
    .sort((a, b) => b.t - a.t)[0];
  return f ? path.join(dir, f.x) : null;
}

// ---------------------------------------------------------------

// fileURLToPath y no `new URL().pathname`: en Windows ese devuelve la ruta
// codificada, y los espacios de la carpeta llegaban como %20.
const aqui = path.dirname(fileURLToPath(import.meta.url));
const entrada = process.argv[2] || masReciente(path.join(aqui, 'entradas'));

if (!entrada || !fs.existsSync(entrada)) {
  console.error(rojo('  No hay archivo que renderizar.'));
  console.error(gris('  Pon el .html del día en .\\entradas\\ o pásame la ruta como argumento.'));
  process.exit(1);
}

const html = fs.readFileSync(entrada, 'utf8');
const { cabeza, laminas, titulos } = partir(html);

if (laminas.length === 0) {
  console.error(rojo('  Ese archivo no trae láminas (no encontré <section class="lamina">).'));
  process.exit(1);
}

const fecha = (path.basename(entrada).match(/\d{4}-\d{2}-\d{2}/) || ['sin-fecha'])[0];
const salida = path.join(aqui, 'salida', fecha);
fs.mkdirSync(salida, { recursive: true });

const temporal = fs.mkdtempSync(path.join(os.tmpdir(), 'carruseles-'));
const chrome = navegador();

console.log(`\n  ${laminas.length} láminas · ${Math.round(laminas.length / 6)} carruseles`);
console.log(gris(`  navegador: ${path.basename(chrome)}`));
console.log(gris(`  salida:    ${salida}\n`));

let hechas = 0, fallidas = 0;

for (let i = 0; i < laminas.length; i++) {
  const carrusel = Math.floor(i / 6);
  const lamina = i % 6;
  const archivo = path.join(temporal, `l${i}.html`);

  // El margen a cero es indispensable: si no, Chrome deja el fondo
  // del body alrededor y la imagen sale con orilla.
  fs.writeFileSync(archivo,
    `<!DOCTYPE html><html lang="es-MX"><head>${cabeza}` +
    `<style>body{background:transparent!important;padding:0!important;margin:0!important;gap:0!important}</style>` +
    `</head><body>${laminas[i]}</body></html>`);

  const destino = path.join(salida, nombrar(titulos[carrusel], carrusel, lamina));

  try {
    execFileSync(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${ANCHO},${ALTO}`,
      `--screenshot=${destino}`,
      // Las fuentes vienen de Google y tardan; sin esto sale con la
      // tipografía de repuesto y el diseño se ve completamente distinto.
      '--virtual-time-budget=4000',
      `file:///${archivo.replace(/\\/g, '/')}`,
    ], { stdio: 'ignore', timeout: 45000 });

    if (fs.existsSync(destino) && fs.statSync(destino).size > 4000) {
      hechas++;
      if (lamina === 5) console.log(`  ${verde('ok')}  ${titulos[carrusel] || 'carrusel ' + (carrusel + 1)}`);
    } else {
      fallidas++;
      console.log(`  ${rojo('falló')}  lámina ${i + 1}`);
    }
  } catch (e) {
    fallidas++;
    console.log(`  ${rojo('falló')}  lámina ${i + 1} · ${e.message.split('\n')[0]}`);
  }
}

fs.rmSync(temporal, { recursive: true, force: true });

console.log(`\n  ${verde(hechas + ' imágenes')}${fallidas ? rojo(' · ' + fallidas + ' fallidas') : ''}`);
console.log(gris(`  ${salida}\n`));
