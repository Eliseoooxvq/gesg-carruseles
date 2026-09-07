# Carruseles GESG

Láminas de marketing del área jurídica de GESG Despacho Contable
(Chiautempan, Tlaxcala) para publicar en redes.

**Este repositorio es público a propósito**, y sólo debe contener eso:
material que de todos modos va a acabar publicado. Nada de código del
despacho, credenciales, datos de clientes ni documentos de estrategia.

## Qué hay aquí

- `marketing/carruseles/AAAA-MM-DD.html` — las 60 láminas del día, ya
  diseñadas. Cada `<section class="lamina">` lleva `data-document-role="page"`
  para que Canva pueda importarlas como páginas editables.
- `marketing/carruseles/INDICE.md` — una línea por cada carrusel que se ha
  propuesto alguna vez. Es lo único que impide que el contenido se empiece a
  repetir; se lee antes de escribir los del día.
- `renderizar.mjs` — convierte el HTML del día en PNG de 1080x1350.

## Cómo sacar las imágenes

Pon el HTML del día en `entradas\` y corre:

    node renderizar.mjs

Salen en `salida\<fecha>\`. Usa el Chrome del sistema sin ventana; no hace
falta instalar nada.
