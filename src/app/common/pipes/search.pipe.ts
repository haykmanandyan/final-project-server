import {Todo} from "../interfaces/todo";
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(todos: Todo[], searchText: string): Todo[] {
    let result: Todo[] = [];
    todos.forEach((todo: Todo) => {
      Object.values(todo).forEach((item: any) => {
        if (item.toString().toLowerCase().includes(searchText.toLowerCase())) {
          result.push(todo);
          return;
        }
      });
    })
    return result;
  }

}
