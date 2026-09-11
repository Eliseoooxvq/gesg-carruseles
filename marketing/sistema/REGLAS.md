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
