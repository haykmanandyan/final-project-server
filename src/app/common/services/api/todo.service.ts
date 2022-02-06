import {Observable} from "rxjs";
import {Post} from "../../interfaces";
import { Injectable } from '@angular/core';
import {Todo} from "../../interfaces/todo";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`todos`)
  }

  public getTodo(id: number): Observable<Todo> {
    return this.http
      .get<Todo>(`todos/${id}`)
  }

  public getUserPosts(id: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`posts`,
        {params: {'userId': id}})
  }

  public addTodo(newTodo: Todo): void {
    this.http
      .post<Todo>(`todos`, newTodo)
      .subscribe((todo: Todo) => console.log(todo));
  }

  public editCurrentTodo(editTodo: Todo): void {
    this.http
      .patch<Todo>(`todos/${editTodo.id}`, editTodo)
      .subscribe((todo: Todo) => console.log(todo));
  }
}
