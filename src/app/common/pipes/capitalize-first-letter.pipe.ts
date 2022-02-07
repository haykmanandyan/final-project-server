import {Pipe, PipeTransform} from '@angular/core';
import {firstLetterUppercase} from "../helpers/first-letter-uppercase";

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    return firstLetterUppercase(value);
  }

}
