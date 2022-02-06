import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(item: any, searchText: any): any {
    if (!searchText) {
      return item;
    }

    const regex = new RegExp(searchText);
    console.log(item.replace(regex, ''));
    const match = item.match(regex);

    if (!match) {
      return item;
    }

    return item.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }

}
