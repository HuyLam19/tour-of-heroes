import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appNormal',
  pure: false,
  standalone: true,
})
export class NormalPipe implements PipeTransform {

  transform(value: string | number): string {
    return `${value}`;
  }

}
