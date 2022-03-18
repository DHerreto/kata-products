import { Pipe, PipeTransform } from '@angular/core';

export function mockPipe(name: string): Pipe {
  const metadata: Pipe = {
    name
  };

  return Pipe(metadata)(
    class MockPipe implements PipeTransform {
      transform() {}
    }
  );
}
