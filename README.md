# Kata Angular

## Servidor de desarrollo

Ejecuta `npm start` para arrancar el servidor local. Navega a `http://localhost:4200/`.

## Running unit tests

Ejecuta `npm run test` para ejecutar los test via [Karma](https://karma-runner.github.io).

## Requisitos funcionales

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
* La Q de un producto nunca es mayor que 50, excepto los Inmutable que por sus propiedades siempre es de 80
* Los productos Inmutable ni se degradan ni modifican su R.
* Los productos Curado incrementan su Q según envejecen de la siguiente manera:
  * Si faltan 10 días o menos, la Q se incrementa en 2
  * Si faltan 5 días o menos, la Q se incrementa en 3
  * Una vez la R baja de 0, la Q cae a 0
