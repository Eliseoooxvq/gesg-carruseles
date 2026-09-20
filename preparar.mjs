/* Prepara los archivos base del dia: copia la muestra de cada estilo, le pone
   el titulo, el area, el comentario de cabecera y —en el estilo foto— sus dos
   fotos. Despues de esto corre expandir.mjs, que arma las diez laminas. */
import fs from 'node:fs';
import path from 'node:path';

const FECHA = process.env.CARR_FECHA || new Date().toISOString().slice(0, 10);
const DIR = path.join('./marketing/carruseles', FECHA);
const MUESTRAS = './marketing/sistema/muestras';
const RAW = 'https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos';

const base = JSON.parse(fs.readFileSync('./base.json', 'utf8'));

fs.mkdirSync(DIR, { recursive: true });

for (const c of base.carruseles) {
  let html = fs.readFileSync(path.join(MUESTRAS, c.estilo + '.html'), 'utf8');

  // Titulo de la pestaña
  html = html.replace(/<title>[^<]*<\/title>/, '<title>GESG &middot; ' + c.titulo + '</title>');

  // Comentario de cabecera, en lugar del de la muestra
  html = html.replace(
    /<!-- ESTILO: [a-z]+ \| MUESTRA del sistema, no se publica -->/,
    '<!-- ESTILO: ' + c.estilo + ' | DESCRIPCION: ' + c.descripcion +
    ' | HASHTAGS: ' + c.hashtags + ' | PARA QUIEN: ' + c.paraQuien + ' -->'
  );

  // Area en el pie y en la barra del chat
  html = html.split('<b>GESG</b> &middot; Defensa fiscal').join('<b>GESG</b> &middot; ' + c.area);
  html = html.split('<b>GESG</b> &middot; Contabilidad').join('<b>GESG</b> &middot; ' + c.area);
  html = html.split('<b>GESG &middot; Área jurídica</b>').join('<b>GESG &middot; ' + c.area + '</b>');

  // El sello del estilo expediente
  if (c.sello) {
    html = html.replace(/<div class="sello">[\s\S]*?<\/div>/, '<div class="sello">' + c.sello + '</div>');
  }

  // Las dos fotos del estilo foto
  if (c.fotoPortada) {
    html = html.replace(/<img class="foto" src="[^"]*" alt="[^"]*">/,
      '<img class="foto" src="' + RAW + '/tinta/' + c.fotoPortada + '.jpg" alt="' + c.altPortada + '">');
  }
  if (c.fotoCierre) {
    html = html.replace(/<div class="marco-foto"><img src="[^"]*" alt="[^"]*"><\/div>/,
      '<div class="marco-foto"><img src="' + RAW + '/natural/' + c.fotoCierre + '.jpg" alt="' + c.altCierre + '"></div>');
  }

  fs.writeFileSync(path.join(DIR, c.archivo), html);
  console.log('  base: ' + c.archivo + '  (' + c.estilo + ' · ' + c.area + ')');
}
