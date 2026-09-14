# Sistema de carruseles GESG — reglas para la rutina

Desde el 11 de septiembre de 2026 los diez carruseles del día **ya no salen
iguales**. Cada uno usa uno de seis estilos. Lo que no cambia entre ellos —y es
lo que hace que el feed se sepa de GESG aunque cada publicación se vea distinta—
es la paleta, las dos tipografías y el pie.

Lee este archivo completo antes de escribir. Es corto a propósito.

---

## 1. Los seis estilos

| Estilo | Clase | Úsalo cuando el tema es… | Muestra |
|---|---|---|---|
| **expediente** | `v-expediente` | un síntoma o una urgencia: sello, requerimiento, plazo corriendo | `muestras/expediente.html` |
| **foto** | `v-foto` | confianza, "por qué nosotros", lo local — o cualquier tema, como respiro visual | `muestras/foto.html` |
| **dato** | `v-dato` | una noticia con **una cifra real que tiene fuente** | `muestras/dato.html` |
| **chat** | `v-chat` | una duda que la gente pregunta tal cual: "¿qué hago si…?" | `muestras/chat.html` |
| **oficio** | `v-oficio` | un papel que llega: carta invitación, requerimiento, oficio | `muestras/oficio.html` |
| **lista** | `v-lista` | qué revisar, pasos, prevención — el natural de contabilidad | `muestras/lista.html` |

## 2. Cómo se reparten en el día

1. Primero escoges el estilo que mejor le queda al tema. Después ajustas para cumplir lo demás.
2. Los diez del día usan **al menos cinco estilos distintos**.
3. **Ningún estilo más de dos veces** en el día.
4. **Dos carruseles seguidos nunca con el mismo estilo** (el 01 y el 02, el 02 y el 03…).
5. El 01 de hoy no repite el estilo del 01 de ayer. Míralo en el `LISTA.md` de ayer.
6. **`dato` sólo si hay una cifra real con fuente.** Si ese día no hay, no se usa. Nunca inventes una cifra para poder usarlo.

## 3. Cómo se arma cada archivo

1. Abre la muestra del estilo y **copia su estructura exacta**: las mismas clases, en el mismo orden, con los mismos elementos vacíos. Cambia sólo los textos.
2. En el `<style>`, pega **completo** `marketing/sistema/estilos.css`, sin cambiarle nada.
3. En el `<head>`, el mismo `<link>` de fuentes que trae la muestra.
4. Cada `<section>` lleva `class="lamina v-<estilo> …"`, `data-document-role="page"` y un `data-label`. Sin eso Canva no lo convierte en páginas.
5. Seis láminas: portada, cuatro interiores y cierre. El cierre de cada estilo es el de su muestra, con el texto de contabilidad cuando el carrusel sea de contabilidad.

## 4. Lo que Canva exige — si no, se rompe al importar

Esto está probado, no es gusto. Canva es más estricto que Chrome:

- **Todo texto que va junto a un adorno va en su propio `<span>`:**
  `<p class="rotulo"><span class="raya"></span><span>Texto</span></p>`, y lo mismo en
  `.paso`, `.nota` y cada `.casilla`. Si el texto va suelto, Canva lo pone al
  principio de la caja y el adorno le queda encima como un tachado.
- **Los adornos son elementos reales, no `::before`.** Dentro de cada rótulo va `<span class="raya"></span>`; en los interiores de foto va `<div class="regla-v"></div>`; dentro de la casilla grande de lista van `<span class="palomita-a"></span><span class="palomita-b"></span>`. Canva tira los pseudo-elementos sin avisar.
- **En todos los títulos (`h1`, `h2`) los renglones se cortan a mano con `<br>`.** No dejes que el navegador parta la línea.
- **La parte en `<em>` siempre empieza en renglón propio:** `…<br><em>…</em>`. Si arranca a media línea y se parte en dos, Canva la saca de la lámina.
- **Las negritas del texto son cortas: de 2 a 4 palabras.** En el estilo oficio, la negrita va en su propio renglón con `<br>` antes.
- Nada de `style=""` en línea, salvo el ancho de la barra de avance de lista.

## 5. Topes de caracteres por renglón

Cuéntalos. Si un renglón se pasa, en Canva se sale de la lámina.

| Estilo | Portada | Interiores |
|---|---|---|
| **expediente** | título: 2–3 renglones de **18**; apoyo: 45 | paso: 28 · título: 2–3 renglones de **18** · texto: 150 |
| **foto** | título: 2–3 renglones de **17**; apoyo: 45 | paso: 28 · título: 2–3 renglones de **16** · texto: 140 |
| **dato** | cifra: **4** caracteres + unidad en `<small>` de 6; título: 2 renglones de 20; apoyo: 45 | cifra: número real o palabra de **6** letras · título: 2 renglones de 18 · texto: 140 |
| **chat** | globo que entra: 70 · globo que sale: 110; título: 2 renglones de **16** | pregunta: 50 · respuesta: 120 · paso: 28 · título: 2 renglones de 16 |
| **oficio** | frase marcada: 50 · nota: 30; título: 2 renglones de **16** | dice: 60, genérica · significa: 2–3 renglones de 22 |
| **lista** | tres casillas de 34; título: 3 renglones de **16** | título: 2–3 renglones de **18** · texto: 130 |

## 6. Fotos

- **Sólo en el estilo foto:** la portada usa `tinta/<nombre>.jpg` y el cierre usa `natural/<nombre>.jpg`.
- Van con URL completa:
  `https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos/tinta/<nombre>.jpg`
- Escoge con `marketing/fotos/INDICE-FOTOS.md`, que dice qué se ve en cada una.
- **En un mismo día ninguna foto se repite.** Y trata de no repetir la de ayer.
- Nunca fotos de internet, de bancos de imágenes ni generadas. Son las de la oficina real o ninguna.
- Cada `<img>` lleva un `alt` que diga qué se ve.

## 5 bis. El título tiene que sostenerse solo

Esto salió de una revisión real del 14 de septiembre: varias láminas tenían
frases que sonaban bien pero no se entendían. Antes de dar por buena una lámina,
pásale estas tres:

1. **El título dice una idea completa.** Si termina a media frase, no sirve.
   Mal: *«Un error / no es lo mismo»* — ¿no es lo mismo que qué?
   Bien: *«Error de cálculo / o factura falsa»*.
2. **El título afirma algo, no nombra un tema.**
   Mal: *«Quién está / señalado»*. Bien: *«Ser su cliente / no te hace igual»*.
3. **El título y el texto dicen lo mismo.** Si el título habla de tu cuenta
   bancaria, el texto no puede estar hablando del Infonavit. Y el rótulo tampoco
   puede contradecir al título: si el rótulo dice *«Lo que sí te decimos»*, el
   título no puede ser *«Nadie te promete nada»*.

Lo mismo aplica a la cifra del estilo **dato**: tiene que apoyar al título, no
pelearse con él. Si el título dice que todavía no es ley, la cifra no puede
gritar un mes como si ya tuviera fecha.

Y la última frase del texto se lee en voz alta antes de darla por buena: si hay
que releerla para entenderla, se reescribe. Nada de remates ingeniosos que se
quedan a medias.

## 6 bis. El marco de foto — para que no se vean planos

**Cada carrusel lleva UN marco de foto en un interior**, normalmente la lámina 3,
justo debajo del encabezado: ahí es donde estos diseños tienen aire de sobra.

La única excepción es el estilo **foto**, que ya trae foto a sangre en la portada
y foto a color en el cierre. Ése no lleva marco.

Se escribe así, y la foto es un `<img>` de verdad, nunca un recuadro vacío:

```html
<div class="marco"><span class="marco-fondo"></span><img src="https://raw.githubusercontent.com/Eliseoooxvq/gesg-carruseles/master/marketing/fotos/natural/recepcion.jpg" alt="Recepción de GESG en Chiautempan"></div>
```

- En lámina **oscura** va la de `natural/` (a color): contrasta con el fondo azul.
- En lámina **clara** va la de `tinta/` (duotono oscuro): contrasta con el papel.
- En **chat, dato y lista** se usa `class="marco bajo"`, que es más bajo y no
  empuja el texto fuera de la lámina. En expediente y oficio cabe el normal.
- Va **después del encabezado** —`.oficio`, `.rotulo`, el `.hilo` del chat o la
  `.barra-avance` de lista— y **antes** del bloque de contenido: `.hueco`,
  `.dice`, `.caja-grande` o `.cifra`.
- La foto no se repite con ninguna otra del mismo día.
- Un recuadro vacío NO sirve: Canva descarta al importar los elementos que no
  tienen fondo. Con la foto puesta nunca se ve un hueco, y en Canva se cambia
  arrastrando otra encima.

## 7. Qué se anota

- En `LISTA.md` del día, dos columnas más: **Estilo** y **Foto** (o "—").
- En `INDICE.md`, al final de cada línea, el estilo entre corchetes:
  `- 2026-09-11 · DF · El SAT me congeló la cuenta [chat]`

## 8. Reglas de contenido que no cambian

Todo lo del prompt de la rutina sigue igual: no prometer resultado, no citar
plazos en días con número ni artículos de ley, no inventar casos ni cifras, nada
de familiar, migratorio, laboral ni lesiones. En el estilo oficio, la frase de
"lo que dice" es **genérica**, del tipo de las que traen estos papeles: nunca un
número de días, nunca un artículo, nunca el texto de un oficio real de un cliente.

---

## 9. Títulos que dan ganas de pasar la lámina

Que el título se entienda no basta. Esto salió de una revisión del 14 de
septiembre: *«están bien chafas, así no me dan ganas de leer el carrusel»*. Y era
cierto — casi todos describían el contenido en vez de dar una razón para seguir.

| No jala, es etiqueta de índice | Jala |
|---|---|
| El IMSS tiene su propio cobro | **El SAT ni se entera** |
| Primero llega una cédula de liquidación | **Ese papel ya trae el número** |
| Para deducirlo hay que timbrarlo | **Sin timbre no hay deducción** |
| Ese valor se puede pelear | **Ese precio se pelea** |
| Al trabajador no le gravan todo | **Una parte no se grava** |

**Cada título tiene que hacer al menos una de estas tres:**

1. **Caerle a él.** Segunda persona y el costo concreto.
   *«Espéralo y te lo cobran de la cuenta»*, no *«No lo dejes para después»*.
2. **Contradecir lo que daba por hecho.**
   *«Tú cambiaste. Tu RFC no.»* · *«Antes sí. Ya no.»*
3. **Abrir algo que la siguiente lámina cierra.**
   *«Y todavía falta el tercero.»* · *«Si no, peor.»*

**Reglas del oficio:**

- **Cortos.** Si cabe en menos renglones que el tope, mejor. *«Antes sí. Ya no.»*
  pesa más que cualquier explicación.
- **Verbo, no sustantivo.** *«Tus facturas te delatan»* pesa más que
  *«Descripción de tus facturas»*.
- **Nada de empezar con «Lo que», «Cómo» o «Qué es».** Ésos son títulos de índice,
  y esa función ya la cumple el rótulo de arriba.
- **El rótulo clasifica, el título golpea.** Si los dos dicen lo mismo, sobra uno.
- **Sin exagerar y sin prometer.** El jalón sale de ser específico, no de gritar.
  Nunca a costa de las reglas duras.

**La prueba final:** lee el título solo, tapando el texto de abajo. Si no te dan
ganas de saber qué sigue, no sirve y se reescribe.

---

## 10. La prueba de doña Lupe

La vara de todo lo que se escribe, y la puso él el 14 de septiembre:

> *«Si doña Lupe de la tiendita de la esquina lo ve, no lo va a entender.»*

Doña Lupe tiene un changarro, factura, paga nómina a dos personas y **nunca ha
estudiado contabilidad**. Si una lámina la deja fuera, no sirve — aunque esté
técnicamente perfecta.

### Palabras que ella no usa, y con qué se cambian

| No | Sí |
|---|---|
| su facultad caduca · prescripción | se les acaba el tiempo para revisarte · para cobrarte |
| determinar un crédito | decirte cuánto debes |
| persona moral | las empresas |
| se acredita contra | se va restando de |
| solicitar en devolución | pedir que te lo regresen |
| retención · retener · enterar | te descuentan · lo paga por ti |
| exento · no gravado | libre de impuesto |
| CFDI de nómina con su clave | el recibo de nómina |
| avalúo · inconformarse | el precio que le pusieron · reclamar |
| el alcance de la orden | lo que dice ese papel |
| la anual | tu declaración del año |
| expediente · procedimiento | los papeles · por su lado |

La única excepción es el estilo **oficio**: ahí la parte de «lo que dice» va en
lenguaje de oficio a propósito, porque de eso se trata. Pero «lo que significa»
se escribe como le hablarías a doña Lupe.

### Alarmante no es gritar

Ella también pidió que suenen **más alarmantes**. Eso NO es exagerar ni amenazar
—sigue prohibido, y además tumba anuncios—. Es decir en palabras de tienda **qué
le puede pasar en concreto**:

| Tibio | Alarmante y cierto |
|---|---|
| No lo dejes para después | **Si lo dejas, te congelan la cuenta** |
| Ese valor se puede pelear | **Si la valuaron muy barata, se reclama** |
| Después se publica la convocatoria | **Cuando lo anuncian, ya casi la pierdes** |
| Deducciones que no embonan | **Te pueden quitar esa deducción** |
| No siempre queda pagado | **Puede que aún debas más** |

El susto viene del hecho concreto, nunca del adjetivo. Y siempre sobre **el
reloj o la consecuencia**, nunca sobre la persona: quien se siente tonto se
esconde y no escribe.

### Cómo se revisa

Lee la lámina completa en voz alta imaginando que se la lees a ella en el
mostrador. Si tienes que explicarle una palabra, esa palabra se cambia.

## 11. Háblale a alguien, y háblale como amigo

Esta es la regla que más se rompe y la que más duele: un carrusel que explica un
tema no le habla a nadie. El lector lo lee, entiende, y sigue de largo porque
nunca sintió que fuera con él.

**Cada lámina —no sólo la portada— tiene que ir dirigida a una persona.** No al
público, no «a los contribuyentes»: a una sola persona que está del otro lado
del mostrador.

### Lo primero de la portada dice a quién le habla

Antes que el título, la portada tiene que decir de quién es el problema. Según
el estilo, eso va en el rótulo, en la línea de apoyo o en el primer globo:

| Estilo | Dónde va | Ejemplo |
|---|---|---|
| expediente · foto · dato | rótulo o subhook | *Si tienes trabajadores dados de alta, esto te toca.* |
| lista · oficio | rótulo | *Si te embargaron algo* · *Si te llegó una orden de visita* |
| chat | el primer globo que entra | *Me llegó algo del SAT y dicen que puede ser más que pagar.* |

La fórmula que nunca falla es **«Si te…» / «Si tienes…» / «Si vendes…»**: pone
al lector adentro o lo deja ir, y las dos cosas están bien.

### El sujeto de la frase eres tú, no la autoridad

Es el cambio que vuelve cercano todo lo demás. Misma información, otro dueño:

| Explicando el tema | Hablándole a él |
|---|---|
| No la rematan así nomás | **No te la rematan de un día para otro** |
| Es el papel donde viene cuánto creen que debes | **Ábrelo: ahí viene cuánto dicen que debes** |
| La propuesta alcanza a las empresas | **Ya no es nada más para ti como persona** |
| Antes se podía. Ya no. | **Antes podías. Ya no.** |
| El notario ya te retuvo | **El notario ya te descontó** |
| Cambió la regla | **Si lo sigues haciendo, se te junta una diferencia** |

### Cómo habla un amigo

Un amigo no da cátedra: te avisa. Se le nota en tres cosas.

1. **Te manda hacer algo.** *Ábrelo aunque te dé flojera* · *Avísale antes, no
   después* · *Espérate tantito* · *Guárdalo* · *No firmes a lo tonto.*
2. **Te calma o te pica antes del dato.** *Tranquilo:* … · *Hazme caso:* … ·
   *Pero aguas,* … · *Y ahí no para:* … · *Sí, hace años se podía.*
3. **Cierra con lo que a ti te cuesta.** *…y te ahorras el coraje* · *…y ni te
   enteras* · *…te sale más caro y con la cuenta congelada.*

Uno por lámina basta. Dos ya suena a que te está vendiendo algo.

### También los rótulos y las casillas

Las etiquetas chiquitas cuentan. Son las que van llevando al lector de la mano:

| Frío | Dirigido |
|---|---|
| Lo que está pasando | Lo que te está pasando |
| A quién alcanza | A ti también te toca |
| Qué revisar hoy | Qué te conviene hacer hoy |
| Lo que se puede caer | Lo que se te puede caer |
| Lo que dice · Lo que significa | Lo que dice tu papel · Qué te está diciendo |

### Lo que no se vale

- Hablarle de **usted**: aquí es de tú, siempre.
- Llamarle «contribuyente», «el cliente» o «la gente». Es **tú**.
- Fingir confianza con apodos («mi buen», «carnal»). Es un amigo que sabe del
  tema, no un vendedor de la calle.
- Tutearlo en el título y volver a explicar en el cuerpo. Si la lámina cambia de
  voz a media página, se siente falsa.

### Cómo se revisa

Lee cada lámina y pregúntate **¿a quién se lo estoy diciendo?**. Si la respuesta
es «a nadie» o «al que sepa del tema», se reescribe. Y si puedes quitarle todos
los *te*, *tu* y *tus* sin que la frase cambie, es que estabas explicando un
tema, no hablándole a alguien.

## 12. Cada carrusel es una historia, y le pasa a Juanito

Cuatro datos sueltos no son un carrusel. El cliente lo dijo así: *"no me
explicas de dónde sale esta situación o qué la origina, me haces las
publicaciones como a la mitad… si veo la de la camioneta es como de qué
camioneta"*. El que ya vivió el problema entiende; el que no —que es el que
todavía se puede salvar— no sabe ni de qué le hablan.

Desde el 14 de septiembre de 2026, **las cinco láminas cuentan una sola
historia**, y la historia le pasa a **Juanito**.

### Quién es Juanito

Juanito es el personaje de la casa. Es **el mismo en todos los carruseles**:
dueño de un negocio chico de Tlaxcala o Puebla, de esos que abren temprano,
atienden ellos mismos y traen la cabeza en vender, no en papeles.

- **No es un cliente del despacho**, ni real ni disfrazado. Es un personaje,
  como el de los dichos. Nunca se le pone apellido, ni negocio con nombre, ni
  cantidades de un caso concreto. Lo que le pasa le pasa a cualquiera en esa
  situación: por eso es cierto aunque él sea inventado. Eso además cuida el
  secreto profesional, porque ningún asunto real se cuenta.
- **No es tonto ni flojo.** Está ocupado y nadie le avisó. Si el lector se
  siente retratado como el tonto, se esconde y no escribe.
- **El «ay, Juanito» es de compadre**: con cariño y con algo de risa, como
  cuando alguien tropieza con la misma piedra. Nunca regaño, burla ni lástima.

Existe para poder enseñar el error **sin apuntarle al que lee**: el golpe se lo
lleva Juanito, el consejo se lo lleva él.

### El arco, lámina por lámina — son DIEZ, no seis

Cuatro láminas obligaban a apretar el texto, y apretado se pierde el detalle.
Con diez, cada lámina carga **una sola idea y poco texto**: se lee como cómic,
deslizando. El detalle no se quita, se reparte.

| # | Qué cuenta | Voz |
|---|---|---|
| 1 | **portada** — Juanito ya con el problema encima. El rótulo o el subhook dicen a quién le habla | 3ª + el rótulo de tú |
| 2 | **así empezó** — Juanito haciendo algo normal, de todos los días | 3ª, pasado |
| 3 | **lo que no sabía** — el detalle que ya lo estaba metiendo en el problema | 3ª |
| 4 | **lo que se fue juntando** — pasa el tiempo y crece solo, en silencio | 3ª |
| 5 | **el día que llegó** — qué le llegó, quién se lo mandó, dónde se lo dejaron | 3ª |
| 6 | **lo que hizo Juanito** — su reacción, que es justo el error | 3ª |
| 7 | **dónde acabó** — la consecuencia concreta y cara | 3ª |
| 8 | **el remate** — «Ay, Juanito. No aprendes.» | — |
| 9 | **¿y tú?** — qué hacer hoy, en concreto y fácil | **2ª — de tú** |
| 10 | **cierre** — el llamado a escribir | 2ª |

**La lámina 2 es la que más se rompe.** Tiene prohibido empezar con un papel,
una revisión o un cobro: eso ya es la 5. Empieza en la vida diaria — contrató a
dos muchachos, le compró a un cuate más barato, puso la camioneta a nombre del
negocio, firmó la escritura.

Y la prueba del arco: al leer la 7 se tiene que entender que viene de la 2. Si
no, no es una historia, son datos en fila.

### Prohibido el sustantivo hueco

Es lo que el cliente reclamó con estas palabras: *«¿Juanito guardó QUÉ?»*. Si
escribes «ese año», «ese papel», «el asunto», «algo del SAT» o «eso» sin haber
dicho antes qué es, el lector se pierde.

| Hueco | Con nombre |
|---|---|
| Juanito guardó ese año en una caja | Entregó las facturas de ese año y nunca le dijeron en qué quedó |
| Un día le llegó un papel | Un señor del IMSS dejó la hoja con uno de los muchachos |
| Lo guardó | Lo guardó en el cajón de los tickets |
| Le embargaron la camioneta | Les dio las llaves sin discutir |

Cada lámina tiene que dejar **una imagen en la cabeza**: el cajón de los
tickets, la bodeguita, el mostrador, el gafete, la venta fuerte de diciembre.
No es adorno — es lo que hace que se lea como cuento y no como aviso. Y
entretenido no es chistoso: es que se quiera saber cómo acaba.

### Los largos, medidos — no a ojo

Estos números salieron del medidor (`desbordes.mjs`), que abre las láminas en
el navegador con la tipografía y las fotos ya cargadas y compara caja por caja.
No son estimaciones:

| Campo | Largo |
|---|---|
| `texto` y `traduccion` | 70 a 115 caracteres |
| el cuerpo de la lámina 8 (el remate) | 30 a 60 — una sola línea |
| `sale` (lo que contesta GESG en el chat) | 80 a 130 |
| `entra` (lo que escribe Juanito) | 30 a 75 |
| renglón de `h1` / `h2` | el tope de su estilo (§5) |
| rótulos chiquitos | 26 |

**El estilo chat es el más apretado de los seis.** Con dos globos largos ya no
caben tres renglones de título: ahí el título va de **dos renglones**, y si el
medidor marca desborde se recortan los globos, no el título.

Las láminas que llevan foto pierden unos 380px de alto, así que ahí el cuerpo
se va al extremo bajo del rango. El generador decide cuáles llevan foto
(dos por carrusel), así que lo seguro es escribir todos los cuerpos cortos.

**Antes de subir nada, se pasa el medidor.** Si dice que algo se sale, se sale
de verdad: en Canva sale cortado y ya no hay vuelta.

### En el estilo chat

El que le escribe al despacho **es Juanito**. La conversación es él
preguntando y GESG contestando, y el remate llega igual en la lámina 5.

### Lo que no cambia

Las secciones 10 y 11 siguen mandando: palabras de tienda, y de tú cuando le
hablas al lector. Juanito no es permiso para escribir bonito ni para adornar.
Y los hechos no se tocan nunca para que la historia cuadre mejor: si un dato
no cabe en la historia, se cambia la historia.
