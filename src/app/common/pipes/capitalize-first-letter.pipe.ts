import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    let result: string = '';
    let words = value.split(' ');
    words.forEach((word: string) => {
      result += word[0].toUpperCase() + word.slice(1);
    })
    return result;
  }

}
