/* ============================================================
   Arma las seis muestras del sistema, una por estilo, con el CSS
   de marketing/sistema/estilos.css ya metido en cada archivo.

   Las muestras sirven para dos cosas: son lo que la rutina copia
   como estructura, y son lo que se renderiza para revisar que un
   cambio al CSS no rompió ningún estilo.

   Todo el marcado está escrito para sobrevivir la importación a
   Canva, que es más estricta que Chrome (probado el 11 sep 2026):
     · los adornos son elementos reales con fondo (raya, regla-v,
       palomita), nunca ::before/::after: Canva los tira
     · en los títulos la parte en <em> empieza en renglón propio:
       si arranca a media línea y se parte, Canva la saca de la lámina
     · las negritas del texto son cortas, de 2 a 4 palabras

     node construir-muestras.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const SISTEMA = path.join(aqui, 'marketing', 'sistema');
const CSS = fs.readFileSync(path.join(SISTEMA, 'estilos.css'), 'utf8');
const FOTOS = 'https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos';

const FUENTES = '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@400;500;600&display=swap">';

const R = '<span class="raya"></span>';
const pie = (area, n) =>
  `<div class="pie"><span><b>GESG</b> &middot; ${area}</span><span class="folio">0${n} / 06</span></div>`;
const datos = `<div class="datos"><div class="tel">246 469 9493</div><div class="web">despachogesg.com</div><div class="dir">Miguel Hernández 403 I, Col. El Alto &middot; Chiautempan, Tlaxcala<br>Despacho contable con área jurídica propia &middot; Tlaxcala y Puebla</div></div>`;
const barraChat = (estado) =>
  `<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>${estado}</span></div></div>`;
const palomita = '<div class="caja-grande"><span class="palomita-a"></span><span class="palomita-b"></span></div>';

const MUESTRAS = {

/* ------------------------------------------------------------ */
expediente: { titulo: 'Te restringieron el sello', laminas: [
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L1 portada">
<div class="oficio">Oficio <span class="tachon"></span>/2026 &nbsp;&middot;&nbsp; Folio <span class="tachon"></span><span class="via">Notificado</span></div>
<div class="sello">Plazo<br>corriendo<small>desde la notificación</small></div>
<div class="hueco"><h1>Le diste<br>timbrar y<br><em>no jaló.</em></h1><p class="subhook">No es el sistema. Es tu sello.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-expediente clara" data-document-role="page" data-label="L2">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">En trámite</span></div>
<div class="hueco"><p class="paso">${R}Lo que está pasando</p><h2>Te restringieron<br>el sello</h2><p class="texto">Mientras esté así, <b>no puedes facturar</b>. Y si no facturas, no cobras.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L3">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">En trámite</span></div>
<div class="hueco"><p class="paso">${R}La parte que sí sirve</p><h2>Sí hay<br>procedimiento</h2><p class="texto">Existe una forma de aclararlo ante la autoridad. <b>No es automático</b>, pero se puede.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-expediente clara" data-document-role="page" data-label="L4">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">Urgente</span></div>
<div class="hueco"><p class="paso">${R}Casi nadie lo sabe</p><h2>El reloj ya<br>va corriendo</h2><p class="texto">No empezó cuando te diste cuenta. <b>Empezó al notificarte.</b></p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L5">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">Advertencia</span></div>
<div class="hueco"><p class="paso">${R}Lo que no hay que hacer</p><h2>No factures<br>con el sello<br>de alguien</h2><p class="texto">Eso convierte un trámite en <b>algo mucho más caro.</b></p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-expediente oscura cierre" data-document-role="page" data-label="L6 cierre">
<div class="oficio">GESG Despacho Contable<span class="via">Área jurídica</span></div>
<div class="hueco"><h2>Mándanos la<br>foto del oficio.<br><em>Te decimos si<br>tiene defensa.</em></h2>${datos}</div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
foto: { titulo: 'El que lleva tus números te defiende', laminas: [
`<section class="lamina v-foto oscura" data-document-role="page" data-label="L1 portada">
<img class="foto" src="${FOTOS}/tinta/sala-asesoria.jpg" alt="Sala de asesoría de GESG en Chiautempan">
<p class="rotulo">${R}Chiautempan, Tlaxcala</p>
<div class="hueco"><h1>El que lleva<br>tus números<br><em>te defiende.</em></h1><p class="subhook">Un despacho contable con abogado adentro.</p></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-foto oscura interior" data-document-role="page" data-label="L2">
<div class="regla-v"></div>
<div class="abajo"><p class="paso">Lo normal</p><h2>Tu contador<br>no puede<br>defenderte</h2><p class="texto">Lleva tus números, pero pelear contra la autoridad <b>no es su trabajo.</b></p></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-foto clara interior" data-document-role="page" data-label="L3">
<div class="regla-v"></div>
<div class="abajo"><p class="paso">Lo que pasa después</p><h2>Buscas un<br>abogado<br>de fuera</h2><p class="texto">Y hay que explicarle tu negocio desde cero. <b>El plazo sigue.</b></p></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-foto oscura interior" data-document-role="page" data-label="L4">
<div class="regla-v"></div>
<div class="abajo"><p class="paso">Aquí es distinto</p><h2>Somos las<br><em>dos cosas</em></h2><p class="texto">Quien revisa tu oficio <b>tiene tu contabilidad</b> enfrente.</p></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-foto clara interior" data-document-role="page" data-label="L5">
<div class="regla-v"></div>
<div class="abajo"><p class="paso">Y estamos aquí</p><h2>A la vuelta,<br>no en la capital</h2><p class="texto">Atendemos <b>Tlaxcala y Puebla</b>. Si hay que ir a defenderte, se va.</p></div>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-foto clara cierre" data-document-role="page" data-label="L6 cierre">
<div class="marco-foto"><img src="${FOTOS}/natural/recepcion.jpg" alt="Recepción de GESG con el logo del despacho"></div>
<p class="pie-foto">Aquí te atendemos &middot; Chiautempan</p>
<h2>Mándanos la foto del oficio.<br><em>Te decimos si tiene defensa.</em></h2>
<div class="datos"><div class="tel">246 469 9493</div><div class="web">despachogesg.com</div></div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
dato: { titulo: '129 mil empresas con pérdida', laminas: [
`<section class="lamina v-dato clara" data-document-role="page" data-label="L1 portada">
<p class="rotulo">${R}El dato de la semana</p>
<div class="cifra">129<small>mil</small></div>
<h1>empresas que el SAT<br><em>ya trae en la mira.</em></h1>
<p class="subhook">Por declarar pérdida tres años seguidos.</p>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-dato oscura interior" data-document-role="page" data-label="L2">
<p class="rotulo">${R}Por qué te alcanza</p>
<div class="cifra">3<small>años</small></div>
<h2>No es solo para<br><em>empresas grandes</em></h2><p class="texto">El cruce es automático: si el resultado sale en pérdida año con año, <b>el sistema lo marca.</b></p>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-dato clara interior" data-document-role="page" data-label="L3">
<p class="rotulo">${R}Cómo empieza</p>
<div class="cifra">Carta</div>
<h2>Casi nunca empieza<br><em>con una auditoría</em></h2><p class="texto">Empieza con una carta o una invitación a aclarar. <b>Ahí se decide todo.</b></p>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-dato oscura interior" data-document-role="page" data-label="L4">
<p class="rotulo">${R}Lo que te salva</p>
<div class="cifra">Papel</div>
<h2>Una pérdida real<br><em>se prueba</em></h2><p class="texto">Contratos, pagos, inventarios, nómina. Sin papeles, <b>es un pendiente.</b></p>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-dato clara interior" data-document-role="page" data-label="L5">
<p class="rotulo">${R}Qué hacer</p>
<div class="cifra">Hoy</div>
<h2>Antes de que<br><em>llegue la carta</em></h2><p class="texto">Revisar ahora cuesta menos que contestar después. <b>Y da tiempo.</b></p>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-dato oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">${R}GESG &middot; Área jurídica</p>
<h2>¿Ya te llegó algo?<br>Mándanos la foto y<br><em>te decimos si tiene defensa.</em></h2>
<div class="datos"><div class="tel">246 469 9493</div><div class="web">despachogesg.com</div></div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
chat: { titulo: 'El SAT me congeló la cuenta', laminas: [
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L1 portada">
${barraChat('Chiautempan, Tlaxcala')}
<div class="hilo">
<div class="globo entra">Dice el banco que el SAT me congeló la cuenta. ¿Qué hago?<span class="hora">23:14</span></div>
<div class="globo sale">Mándame foto del oficio que te llegó. Primero hay que saber qué es.<span class="hora">23:16</span></div>
</div>
<div class="hueco"><h1>Te congelaron<br><em>la cuenta.</em></h1></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L2">
${barraChat('en línea')}
<div class="hilo">
<div class="globo entra">¿Por qué, si yo no debo nada?</div>
<div class="globo sale">Casi siempre hay <b>un crédito fiscal</b> que no se pagó ni se peleó a tiempo.</div>
</div>
<div class="hueco"><p class="paso">Lo primero</p><h2>Saber de dónde<br><em>viene el cobro</em></h2></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L3">
${barraChat('en línea')}
<div class="hilo">
<div class="globo entra">¿Y si nunca me llegó nada?</div>
<div class="globo sale">Eso se revisa. <b>Cómo te notificaron</b> importa mucho, y ahí puede estar la defensa.</div>
</div>
<div class="hueco"><p class="paso">Lo que se revisa</p><h2>Cómo te<br><em>notificaron</em></h2></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L4">
${barraChat('en línea')}
<div class="hilo">
<div class="globo entra">¿Pago y ya?</div>
<div class="globo sale">A veces es lo más barato, y te lo decimos. Pero <b>primero se lee</b>: no todos están bien hechos.</div>
</div>
<div class="hueco"><p class="paso">Antes de pagar</p><h2>Que alguien<br><em>lo lea primero</em></h2></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L5">
${barraChat('en línea')}
<div class="hilo">
<div class="globo entra">¿Cuánto tiempo tengo?</div>
<div class="globo sale">Depende del caso. Lo que es igual para todos: <b>esperar quita opciones.</b></div>
</div>
<div class="hueco"><p class="paso">Lo que sí es seguro</p><h2>Esperar<br><em>no ayuda</em></h2></div>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-chat oscura cierre" data-document-role="page" data-label="L6 cierre">
${barraChat('en línea')}
<div class="hilo">
<div class="globo sale">Mándanos la foto del oficio. <b>Te decimos si tiene defensa.</b></div>
</div>
<div class="hueco"><h2>Escríbenos<br><em>a la hora que sea.</em></h2>${datos}</div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
oficio: { titulo: 'Te llegó una carta invitación', laminas: [
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L1 portada">
<p class="rotulo">${R}Traducción del oficio</p>
<div class="hoja"><div class="renglon"></div><div class="renglon corto"></div><p class="marcado"><span>Se le invita a aclarar las diferencias detectadas</span></p><div class="renglon"></div><div class="renglon corto"></div></div>
<p class="nota">${R}esto todavía no es una multa</p>
<div class="hueco"><h1>Te llegó una<br><em>carta invitación.</em></h1></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L2">
<p class="rotulo">${R}Frase 1 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“Se le invita a presentar su declaración…”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Todavía no te cobran.<br><b>Te están avisando.</b></p></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-oficio oscura" data-document-role="page" data-label="L3">
<p class="rotulo">${R}Frase 2 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“…las diferencias detectadas en sus ingresos.”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">El SAT cruzó tus facturas con tu banco.<br><b>Algo no cuadra.</b></p></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L4">
<p class="rotulo">${R}Frase 3 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“…a efecto de que regularice su situación.”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Es el momento<br><b>en que tú decides</b><br>cómo se arregla.</p></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-oficio oscura" data-document-role="page" data-label="L5">
<p class="rotulo">${R}Frase 4 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“En caso de no atender la presente…”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Si la ignoras,<br><b>puede volverse revisión.</b></p></div>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-oficio oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">${R}GESG &middot; Área jurídica</p>
<h2>¿Te llegó una?<br>Mándanos la foto y<br><em>te la traducimos.</em></h2>${datos}
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
lista: { titulo: 'Cuatro cruces que el SAT hace solo', laminas: [
`<section class="lamina v-lista oscura" data-document-role="page" data-label="L1 portada">
<p class="rotulo">${R}Revisión de 5 minutos</p>
<h1>Cuatro cruces<br>que el SAT<br><em>hace solo.</em></h1>
<div class="casillas"><div class="casilla"><span class="caja"></span>Lo que facturas contra tu banco</div><div class="casilla"><span class="caja"></span>Lo que deduces contra tus facturas</div><div class="casilla"><span class="caja"></span>Tu nómina contra el IMSS</div></div>
${pie('Contabilidad', 1)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L2">
<div class="avance"><span>Cruce 1</span><span>de 4</span></div><div class="barra-avance"><span style="width:25%"></span></div>
${palomita}
<h2>Lo que facturas,<br><em>contra lo que<br>te depositan</em></h2><p class="texto">Si al banco entra más de lo que facturas, <b>el SAT lo ve.</b></p>
${pie('Contabilidad', 2)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L3">
<div class="avance"><span>Cruce 2</span><span>de 4</span></div><div class="barra-avance"><span style="width:50%"></span></div>
${palomita}
<h2>Lo que deduces,<br><em>contra tus facturas</em></h2><p class="texto">Un gasto sin factura a tu nombre <b>no se sostiene</b> cuando lo revisan.</p>
${pie('Contabilidad', 3)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L4">
<div class="avance"><span>Cruce 3</span><span>de 4</span></div><div class="barra-avance"><span style="width:75%"></span></div>
${palomita}
<h2>Tu nómina,<br><em>contra el IMSS</em></h2><p class="texto">Sueldos que no están dados de alta <b>aparecen solos</b> en el cruce.</p>
${pie('Contabilidad', 4)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L5">
<div class="avance"><span>Cruce 4</span><span>de 4</span></div><div class="barra-avance"><span style="width:100%"></span></div>
${palomita}
<h2>Lo que declaras,<br><em>contra lo que<br>ya sabe</em></h2><p class="texto">Tus clientes y proveedores también reportan. <b>Tiene que coincidir.</b></p>
${pie('Contabilidad', 5)}</section>`,
`<section class="lamina v-lista oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">${R}GESG Despacho Contable</p>
<h2>Antes de que<br>sea un problema,<br><em>pregúntanos.</em></h2>${datos}
${pie('Contabilidad', 6)}</section>`,
]},
};

fs.mkdirSync(path.join(SISTEMA, 'muestras'), { recursive: true });
for (const [clave, m] of Object.entries(MUESTRAS)) {
  const html = `<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<title>Muestra · ${clave} · ${m.titulo}</title>
${FUENTES}
<style>
${CSS}
</style>
</head>
<!-- ESTILO: ${clave} | MUESTRA del sistema, no se publica -->
<body>
${m.laminas.join('\n\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(SISTEMA, 'muestras', clave + '.html'), html);
  console.log('  ok  muestras/' + clave + '.html');
}
