# PocketLimit

## Mi Cajita (vista previa local)

La pantalla inicial permite activar el seguimiento con un saldo inicial y su fecha. Usa la tasa anual indicada en tu cuenta (13% por defecto). Todos los gastos desde la fecha de inicio, incluida esa fecha, se descuentan. Registra entradas como depósitos y salidas adicionales como retiros; no dupliques un gasto como retiro.

El saldo estimado incluye interés compuesto por días completos: saldo al cierre × tasa anual / 365, redondeado a centavos, acreditado al día siguiente. Los cambios de tasa tienen fecha de aplicación y conservan el cálculo anterior. Un ajuste al saldo real fija el saldo al cierre de su fecha después de los demás movimientos y se muestra separado de los depósitos y el rendimiento. Puedes editar o eliminar movimientos y corregir el saldo inicial. El cálculo se actualiza al abrir, recuperar el foco y cada minuto sin depender de tareas en segundo plano.

Es una estimación antes de impuestos: no reproduce automáticamente condiciones promocionales, límites ni retenciones de Nu. La tasa es ingresada por el usuario. Registra únicamente el saldo realmente apartado en la Cajita Turbo. La app no se conecta al banco. Los respaldos incluyen la Cajita y aceptan respaldos antiguos sin ella; restaurar uno antiguo reemplazará también el seguimiento de la Cajita. La Cajita es el único saldo; semanas y meses solo agrupan los gastos. Los campos antiguos de presupuesto se conservan internamente para poder restaurar respaldos anteriores.

Una PWA personal en español, con React, TypeScript e IndexedDB. Sin cuentas, servidor de datos, analítica ni servicios de pago. Importes en centavos y presentación en MXN.

## Probar en tu computadora

Instala Node.js 24 LTS. Abre una terminal en esta carpeta y ejecuta:

```sh
npm ci
npm run dev
```

Abre la dirección que aparece (normalmente http://localhost:5173). Para verificar la versión instalable y sin conexión:

```sh
npm test
npm run build
npm run preview
```

Abre http://localhost:4173, espera unos segundos y recarga. El service worker solo se registra en la versión de producción; necesita HTTPS o localhost. Una dirección HTTP de tu computadora en la red local sirve para revisar el diseño en iPhone, pero no prepara el modo sin conexión. Para instalar usa la publicación HTTPS.

## Publicar gratis en GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `pocketlimit`.
2. Sube **el contenido de esta carpeta a la raíz del repositorio**, incluida `.github/workflows/deploy.yml`, `package-lock.json` y `scripts/`. No subas `node_modules` ni `dist`.
3. Usa la rama `main`. En Settings → Pages → Build and deployment → Source, elige **GitHub Actions**.
4. En Actions, espera a que termine “Publicar PocketLimit”. Si hace falta, usa Run workflow.
5. Abre la dirección indicada en Pages: `https://TU_USUARIO.github.io/pocketlimit/`.

Las rutas relativas funcionan tanto en un subdirectorio como en un dominio propio. El flujo compila y ejecuta las pruebas antes de publicar. Documentación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Instalar en iPhone

Abre la dirección HTTPS en Safari. Toca Compartir → Añadir a pantalla de inicio; activa Abrir como app web si aparece y toca Añadir. Abre PocketLimit desde su icono con internet una primera vez; ve a Ajustes y espera “Modo sin conexión listo”. Después cierra la app, activa modo avión y vuelve a abrirla para comprobar el funcionamiento. Guía de Apple: https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios

## Cómo funciona

- Cajita muestra el único saldo estimado, depósitos, retiros y rendimiento. Configura tu saldo inicial y tasa en esa pantalla.
- Gastos y Resumen permiten agrupar el historial por semanas o meses, sin límites ni presupuestos. Registrar un gasto usa por defecto la fecha de hoy, aunque estés viendo otro periodo.
- Toca un movimiento para editar o eliminar. La eliminación solicita confirmación.
- Resumen muestra categorías y totales de seis periodos. Añade categorías desde Ajustes; las categorías usadas no se pueden eliminar.
- Exportar JSON descarga un respaldo completo. En iPhone, guárdalo en Archivos. Restaurar valida el contenido y pide confirmación antes de reemplazar los datos.

## Privacidad y límites

Tus datos viven en IndexedDB de este navegador y dirección web. La app no envía gastos a ningún servidor y no carga fuentes externas. GitHub recibe las solicitudes normales para descargar la app. Los respaldos JSON no están cifrados. Safari y la app instalada pueden tener almacenamiento separado: importa un respaldo si lo necesitas. Borrar datos del navegador, cambiar de dirección o perder el dispositivo puede borrar el historial; conserva respaldos. Esta primera versión está pensada para usar una sola ventana a la vez: dos ventanas editando simultáneamente pueden sobrescribir cambios. No sincroniza entre dispositivos ni se conecta a bancos.

Las nuevas versiones quedan listas cuando el service worker termina de instalarse. Cierra todas las ventanas de PocketLimit y vuelve a abrir para activar una actualización. No borres los datos de Safari para actualizar.

## Comprobación manual recomendada

1. Configura la Cajita; crea depósitos y gastos con decimales, distintas fechas y categorías.
2. Edita y elimina; recarga y comprueba que persisten.
3. Navega entre periodos; comprueba totales y estadísticas.
4. Exporta, modifica un gasto y restaura el respaldo; verifica los totales. Prueba un JSON inválido: debe conservar los datos actuales.
5. En la versión publicada, abre una vez con internet y repite registro/edición/recarga en modo avión.
6. Revisa en un iPhone real el teclado decimal, la instalación, la descarga del respaldo y las zonas seguras.

Las pruebas automatizadas cubren importes, límites de periodos, fechas bisiestas y validación del respaldo. Compilar no sustituye las comprobaciones en un iPhone real.



## Efectivo y gastos unificados

Efectivo lleva el saldo de la billetera sin rendimientos. Configura cuánto tienes hoy; las entradas y los ajustes se registran desde el botón central `$`. Un gasto permite elegir Cajita o Efectivo. Los gastos sin cuenta en respaldos anteriores pertenecen a Cajita. Gastos y resumen muestra ambos en un único historial con estadísticas.

El menú usa `−$` para Gasto, `+$` para Depósito o Entrada de efectivo y `≈$` para ajustar saldo. Retiro ya no aparece como acción nueva; los registros antiguos se conservan. Añadir efectivo no transfiere dinero desde la Cajita automáticamente: los saldos se llevan por separado. Para reflejar una retirada real de Nu, añade el efectivo y ajusta la Cajita a su saldo real, sin registrar esa transferencia como gasto.
