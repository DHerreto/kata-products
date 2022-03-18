import { PascalKebabCasePipe } from './pascal-kebab.pipe';

describe('PascalKebabCasePipe', () => {
  // Ejemplo de que la cobertura de código es un dato, pero puede llevarnos a falsos positivos
  // Ya que si desde product-detail.component.spec importan el modulo de esta pipe
  // nos da 100% de cobertura, pero realmente no tiene ningún test

  it('create an instance', () => {
    const pipe = new PascalKebabCasePipe();
    expect(pipe).toBeTruthy();
  });
});
