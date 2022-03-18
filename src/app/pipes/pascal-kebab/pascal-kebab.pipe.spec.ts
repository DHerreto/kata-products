import { PascalKebabCasePipe } from './pascal-kebab.pipe';

describe('PascalKebabCasePipe', () => {
  // Ejemplo de que la cobertura de código es un dato, pero puede llevarnos a falsos positivos
  // Ya que si desde product-detail.component.spec importan el modulo de esta pipe
  // nos da 100% de cobertura, pero realmente no tiene ningún test
  const pipe = new PascalKebabCasePipe();

  it('should exist', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return nothign if receives nothing', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should transform string on Pascal-Kebab format', () => {
    expect(pipe.transform('will')).toBe('Will');
    expect(pipe.transform('WILL')).toBe('Will');
    expect(pipe.transform('wilL')).toBe('Will');
    expect(pipe.transform('wiLl')).toBe('Will');

    expect(pipe.transform('will smith')).toBe('Will-Smith');
    expect(pipe.transform('WILL SMITH')).toBe('Will-Smith');
    expect(pipe.transform('wilL SmitH')).toBe('Will-Smith');
    expect(pipe.transform('wiLl smITh')).toBe('Will-Smith');

    expect(pipe.transform('Pellentesque laoreet elit at nulla tincidunt aliquam')).toBe('Pellentesque-Laoreet-Elit-At-Nulla-Tincidunt-Aliquam');
  })

});
