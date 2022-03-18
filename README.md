# Kata Angular

## Requisitos para local

* Node 12.16.3 o superior
* Git
* IDE de desarrollo

## Alternativa online

[Stackblitz](https://stackblitz.com/edit/angular-tdd-example-26gbu8)

## Servidor de desarrollo (local)

Ejecuta `npm start` para arrancar el servidor local. Accede por navegador  web a `http://localhost:4200/`.

## Running unit tests (local)

Ejecuta `npm run test` para ejecutar las pruebas vía [Karma](https://karma-runner.github.io).

## Desarrollo online (stackblitz)

Hay dos archivos main.ts (main.ts y main.ts.jasmine) hay que ir jugando, cambiando el nombre de este archivo para que arranque la web (main.ts) o ejecute los test con Jasmine.

## Objetivo principal

* Conocer como se gestiona la inyección de dependencia en distintos los distintos artefactos Angular (componentes, servicios y pipes) y como se instancian.

* Conocer las diferencias entre test de componentes (TS + Html) y de servicio de API (como mockear HTTP-Request).

## Objetivo secundario

* Conocer TDD y su ciclo [RED – GREEN – REFACTOR](https://softwarecrafters.io/javascript/tdd-test-driven-development)

## Requisitos funcionales de la aplicación

Nuestro PF quiere un simulador de productos, donde puede ver como se degradan los productos según se van acercando a su R (fecha de retirada).

Para ello necesitamos una pantalla donde se listen los productos. Para cada producto se debe mostrar su nombre, R, Q (calidad) y el tipo de producto (Perecedero, Curado, Antiguo, Inmutable).

Cuando se pulse sobre un producto se deberá mostrar un formulario para poder editar dicho producto, todos sus campos excepto su Id.

La simulación:

* Debe haber un botón que descuente en uno la R de todos los productos listados.
* Una vez que la R baja de 0, la Q se degrada al doble de velocidad. En caso contrario la Q baja 1 unidad al día.
* Cuando un producto baje su calidad a 0 debe mostrarse su ficha en rojo.
* La calidad nunca es negativa.
* Los productos tipo Antiguo incrementan su calidad a medida que envejecen
  * Su Q aumenta 1 unidad cada día
  * Pasada su R aumenta 2 unidades al día
* Cuando un producto alcance la máxima calidad de su tipo debe aparecer en verde.
* La Q de un producto nunca es mayor que 50, excepto los Inmutable que por sus propiedades su Q será con la que el producto se creó
* Los productos Inmutable ni se degradan ni modifican su R.
* Los productos Curado incrementan su Q según envejecen de la siguiente manera:
  * Si faltan 10 días o menos, la Q se incrementa en 2
  * Si faltan 5 días o menos, la Q se incrementa en 3
  * Si faltan más incrementa en 1
  * Una vez la R baja de 0, la Q cae a 0

## Nuevo requisito

* Ahora PF quiere simular también los productos de tipo Congelado o Frozen, estos degradan su Q al doble de velocidad que los productos normales (Perecedero)
