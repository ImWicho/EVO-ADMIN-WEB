import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpace'
})
export class AddSpacePipe implements PipeTransform {

  transform(value: any): string {
    return value.replace('_', ' ').toLocaleUpperCase();
  }

}
