import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalKebabCase',
})
export class PascalKebabCasePipe implements PipeTransform {
  transform(string: string): string {
    return (
      string &&
      string
        .split(' ')
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.toLocaleLowerCase().slice(1)
        )
        .join('-')
    );
  }
}
