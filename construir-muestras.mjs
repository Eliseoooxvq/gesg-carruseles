/* ============================================================
   Arma las seis muestras del sistema, una por estilo, con el CSS
   de marketing/sistema/estilos.css ya metido en cada archivo.

   Las muestras sirven para dos cosas: son lo que la rutina copia
   como estructura, y son lo que se renderiza para revisar que un
   cambio al CSS no rompió ningún estilo.

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

const pie = (area, n, flecha = true) =>
  `<div class="pie"><span><b>GESG</b> &middot; ${area}</span><span class="folio">0${n} / 06</span></div>`;

const datos = `<div class="datos"><div class="tel">246 469 9493</div><div class="web">despachogesg.com</div><div class="dir">Miguel Hernández 403 I, Col. El Alto &middot; Chiautempan, Tlaxcala<br>Despacho contable con área jurídica propia &middot; Tlaxcala y Puebla</div></div>`;

const MUESTRAS = {

/* ------------------------------------------------------------ */
expediente: { titulo: 'Te restringieron el sello', area: 'Defensa fiscal', laminas: [
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L1 portada">
<div class="oficio">Oficio <span class="tachon"></span>/2026 &nbsp;&middot;&nbsp; Folio <span class="tachon"></span><span class="via">Notificado</span></div>
<div class="sello">Plazo<br>corriendo<small>desde la notificación</small></div>
<div class="hueco"><h1>Le diste<br>timbrar y<br><em>no jaló.</em></h1><p class="subhook">No es el sistema. Es tu sello.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-expediente clara" data-document-role="page" data-label="L2">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">En trámite</span></div>
<div class="hueco"><p class="paso">Lo que está pasando</p><h2>Te restringieron<br>el sello</h2><p class="texto">Y mientras esté así <b>no puedes facturar</b>. Si no facturas, no cobras.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L3">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">En trámite</span></div>
<div class="hueco"><p class="paso">La parte que sí sirve</p><h2>Sí hay<br>procedimiento</h2><p class="texto">Existe una forma de aclararlo ante la autoridad. <b>No es automático</b>, pero se puede.</p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-expediente clara" data-document-role="page" data-label="L4">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">Urgente</span></div>
<div class="hueco"><p class="paso">Casi nadie lo sabe</p><h2>El reloj ya<br>va corriendo</h2><p class="texto">No empezó cuando te diste cuenta: <b>empezó el día que te notificaron.</b></p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-expediente oscura" data-document-role="page" data-label="L5">
<div class="oficio">Expediente <span class="tachon"></span> &nbsp;&middot;&nbsp; Chiautempan, Tlax.<span class="via">Advertencia</span></div>
<div class="hueco"><p class="paso">Lo que no hay que hacer</p><h2>No factures<br>con el sello<br>de alguien</h2><p class="texto">Eso convierte un trámite en <b>un problema mucho más caro.</b></p></div>
<div class="perfil"></div>${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-expediente oscura cierre" data-document-role="page" data-label="L6 cierre">
<div class="oficio">GESG Despacho Contable<span class="via">Área jurídica</span></div>
<div class="hueco"><h2>Mándanos la<br>foto del oficio.<br><em>Te decimos si<br>tiene defensa.</em></h2>${datos}</div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
foto: { titulo: 'El que lleva tus números te defiende', area: 'Defensa fiscal', laminas: [
`<section class="lamina v-foto oscura" data-document-role="page" data-label="L1 portada">
<img class="foto" src="${FOTOS}/tinta/sala-asesoria.jpg" alt="Sala de asesoría de GESG en Chiautempan">
<p class="rotulo">Chiautempan, Tlaxcala</p>
<div class="hueco"><h1>El que lleva<br>tus números<br><em>te defiende.</em></h1><p class="subhook">Un despacho contable con abogado adentro.</p></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-foto oscura interior" data-document-role="page" data-label="L2">
<div class="abajo"><p class="paso">Lo normal</p><h2>Tu contador<br>no puede<br>defenderte</h2><p class="texto">Lleva tus números, pero pelear un acto de autoridad <b>no es su trabajo.</b></p></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-foto clara interior" data-document-role="page" data-label="L3">
<div class="abajo"><p class="paso">Lo que pasa después</p><h2>Buscas un<br>abogado<br>de fuera</h2><p class="texto">Y hay que explicarle tu negocio desde cero. <b>Mientras, el plazo sigue.</b></p></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-foto oscura interior" data-document-role="page" data-label="L4">
<div class="abajo"><p class="paso">Aquí es distinto</p><h2>Somos las<br><em>dos cosas</em></h2><p class="texto">Quien revisa tu oficio <b>tiene enfrente tu contabilidad.</b></p></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-foto clara interior" data-document-role="page" data-label="L5">
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
dato: { titulo: '129 mil empresas con pérdida', area: 'Defensa fiscal', laminas: [
`<section class="lamina v-dato clara" data-document-role="page" data-label="L1 portada">
<p class="rotulo">El dato de la semana</p>
<div class="cifra">129<small>mil</small></div>
<h1>empresas que el SAT <em>ya trae en la mira.</em></h1>
<p class="subhook">Por declarar pérdida tres años seguidos.</p>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-dato oscura interior" data-document-role="page" data-label="L2">
<p class="rotulo">Por qué te alcanza</p>
<div class="cifra">3<small>años</small></div>
<h2>No es solo para <em>empresas grandes</em></h2><p class="texto">El cruce es automático: si tus ingresos suben y el resultado sale en pérdida año con año, <b>el sistema lo marca.</b></p>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-dato clara interior" data-document-role="page" data-label="L3">
<p class="rotulo">Cómo empieza</p>
<div class="cifra">Carta</div>
<h2>Casi nunca empieza con <em>una auditoría</em></h2><p class="texto">Empieza con una carta o una invitación a aclarar. <b>Ahí se decide si crece o se cierra.</b></p>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-dato oscura interior" data-document-role="page" data-label="L4">
<p class="rotulo">Lo que te salva</p>
<div class="cifra">Papel</div>
<h2>Una pérdida real <em>se prueba</em></h2><p class="texto">Contratos, pagos, inventarios, nómina. <b>Si no se sostiene con papeles, es un pendiente.</b></p>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-dato clara interior" data-document-role="page" data-label="L5">
<p class="rotulo">Qué hacer</p>
<div class="cifra">Hoy</div>
<h2>Antes de que <em>llegue la carta</em></h2><p class="texto">Revisar ahora cuesta menos que contestar después. <b>Y da tiempo de juntar lo que falta.</b></p>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-dato oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">GESG &middot; Área jurídica</p>
<h2>¿Ya te llegó algo? Mándanos la foto y <em>te decimos si tiene defensa.</em></h2>
<div class="datos"><div class="tel">246 469 9493</div><div class="web">despachogesg.com</div></div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
chat: { titulo: 'El SAT me congeló la cuenta', area: 'Defensa fiscal', laminas: [
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L1 portada">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>Chiautempan, Tlaxcala</span></div></div>
<div class="hilo">
<div class="globo entra">Me dice el banco que el SAT me congeló la cuenta. ¿Qué hago?<span class="hora">23:14</span></div>
<div class="globo sale">Mándame foto del oficio que te llegó. Primero hay que saber qué es.<span class="hora">23:16</span></div>
</div>
<div class="hueco"><h1>Te congelaron<br><em>la cuenta.</em></h1></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L2">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>en línea</span></div></div>
<div class="hilo">
<div class="globo entra">¿Por qué me la congelaron si yo no debo nada?</div>
<div class="globo sale">Casi siempre es porque <b>hay un crédito fiscal</b> que no se pagó ni se peleó a tiempo. A veces ni te enteraste de que existía.</div>
</div>
<div class="hueco"><p class="paso">Lo primero</p><h2>Saber de dónde<br><em>viene el cobro</em></h2></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L3">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>en línea</span></div></div>
<div class="hilo">
<div class="globo entra">¿Y si nunca me llegó nada?</div>
<div class="globo sale">Eso se revisa. <b>Cómo y cuándo te notificaron</b> importa mucho, y a veces ahí está la defensa.</div>
</div>
<div class="hueco"><p class="paso">Lo que se revisa</p><h2>Cómo te<br><em>notificaron</em></h2></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L4">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>en línea</span></div></div>
<div class="hilo">
<div class="globo entra">¿Pago y ya?</div>
<div class="globo sale">A veces es lo más barato, y te lo decimos. Pero <b>antes de pagar hay que leer el oficio</b>: no todos están bien hechos.</div>
</div>
<div class="hueco"><p class="paso">Antes de pagar</p><h2>Que alguien<br><em>lo lea primero</em></h2></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-chat oscura" data-document-role="page" data-label="L5">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>en línea</span></div></div>
<div class="hilo">
<div class="globo entra">¿Cuánto tiempo tengo?</div>
<div class="globo sale">Depende del caso. Lo que sí es igual para todos: <b>entre más esperas, menos opciones quedan.</b></div>
</div>
<div class="hueco"><p class="paso">Lo que sí es seguro</p><h2>Esperar<br><em>no ayuda</em></h2></div>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-chat oscura cierre" data-document-role="page" data-label="L6 cierre">
<div class="barra"><div class="avatar">G</div><div class="quien"><b>GESG &middot; Área jurídica</b><span>en línea</span></div></div>
<div class="hilo">
<div class="globo sale">Mándanos la foto del oficio. <b>Te decimos si tiene defensa.</b> La revisión no te cuesta.</div>
</div>
<div class="hueco"><h2>Escríbenos<br><em>a la hora que sea.</em></h2>${datos}</div>
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
oficio: { titulo: 'Te llegó una carta invitación', area: 'Defensa fiscal', laminas: [
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L1 portada">
<p class="rotulo">Traducción del oficio</p>
<div class="hoja"><div class="renglon"></div><div class="renglon corto"></div><p class="marcado"><span>Se le invita a aclarar las diferencias detectadas</span></p><div class="renglon"></div><div class="renglon corto"></div></div>
<p class="nota">esto todavía no es una multa</p>
<div class="hueco"><h1>Te llegó una<br><em>carta invitación.</em></h1></div>
${pie('Defensa fiscal', 1)}</section>`,
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L2">
<p class="rotulo">Frase 1 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“Se le invita a presentar su declaración…”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Todavía no te cobran: <b>te están avisando.</b></p></div>
${pie('Defensa fiscal', 2)}</section>`,
`<section class="lamina v-oficio oscura" data-document-role="page" data-label="L3">
<p class="rotulo">Frase 2 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“…las diferencias detectadas en sus ingresos.”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">El SAT cruzó tus facturas con tu banco <b>y algo no cuadra.</b></p></div>
${pie('Defensa fiscal', 3)}</section>`,
`<section class="lamina v-oficio clara" data-document-role="page" data-label="L4">
<p class="rotulo">Frase 3 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“…a efecto de que regularice su situación.”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Es el momento <b>en que tú decides</b> cómo se arregla.</p></div>
${pie('Defensa fiscal', 4)}</section>`,
`<section class="lamina v-oficio oscura" data-document-role="page" data-label="L5">
<p class="rotulo">Frase 4 de 4</p>
<div class="dice"><span class="etiqueta">Lo que dice</span><p class="frase">“En caso de no atender la presente…”</p></div>
<div class="significa"><span class="etiqueta">Lo que significa</span><p class="frase">Si la ignoras, <b>puede volverse revisión.</b></p></div>
${pie('Defensa fiscal', 5)}</section>`,
`<section class="lamina v-oficio oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">GESG &middot; Área jurídica</p>
<h2>¿Te llegó una?<br>Mándanos la foto y<br><em>te la traducimos.</em></h2>${datos}
${pie('Defensa fiscal', 6)}</section>`,
]},

/* ------------------------------------------------------------ */
lista: { titulo: 'Cuatro cruces que el SAT hace solo', area: 'Contabilidad', laminas: [
`<section class="lamina v-lista oscura" data-document-role="page" data-label="L1 portada">
<p class="rotulo">Revisión de 5 minutos</p>
<h1>Cuatro cruces<br>que el SAT<br><em>hace solo.</em></h1>
<div class="casillas"><div class="casilla"><span class="caja"></span>Lo que facturas contra tu banco</div><div class="casilla"><span class="caja"></span>Lo que deduces contra tus facturas</div><div class="casilla"><span class="caja"></span>Tu nómina contra el IMSS</div></div>
${pie('Contabilidad', 1)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L2">
<div class="avance"><span>Cruce 1</span><span>de 4</span></div><div class="barra-avance"><span style="width:25%"></span></div>
<div class="caja-grande"></div>
<h2>Lo que facturas contra <em>lo que te depositan</em></h2><p class="texto">Si al banco entra más de lo que facturas, <b>la diferencia la ve el SAT.</b></p>
${pie('Contabilidad', 2)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L3">
<div class="avance"><span>Cruce 2</span><span>de 4</span></div><div class="barra-avance"><span style="width:50%"></span></div>
<div class="caja-grande"></div>
<h2>Lo que deduces contra <em>tus facturas</em></h2><p class="texto">Un gasto sin factura a tu nombre <b>no se sostiene</b> cuando lo revisan.</p>
${pie('Contabilidad', 3)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L4">
<div class="avance"><span>Cruce 3</span><span>de 4</span></div><div class="barra-avance"><span style="width:75%"></span></div>
<div class="caja-grande"></div>
<h2>Tu nómina contra <em>el IMSS</em></h2><p class="texto">Si pagas sueldos que no están dados de alta, <b>aparecen solos</b> en el cruce.</p>
${pie('Contabilidad', 4)}</section>`,
`<section class="lamina v-lista clara" data-document-role="page" data-label="L5">
<div class="avance"><span>Cruce 4</span><span>de 4</span></div><div class="barra-avance"><span style="width:100%"></span></div>
<div class="caja-grande"></div>
<h2>Lo que declaras contra <em>lo que ya sabe</em></h2><p class="texto">Tus clientes y proveedores también reportan. <b>Tus números tienen que coincidir.</b></p>
${pie('Contabilidad', 5)}</section>`,
`<section class="lamina v-lista oscura cierre" data-document-role="page" data-label="L6 cierre">
<p class="rotulo">GESG Despacho Contable</p>
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
