import {Subject, takeUntil} from "rxjs";
import {Todo} from "../../../../../common/interfaces/todo";
import {TodoService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public todos: Todo[] = [];
  public searchText = '';
  public objectValues = Object.values;

  constructor(
    private todoService: TodoService,
  ) {
  }

  public ngOnInit(): void {
    this.getTodos();
  }

  private getTodos(): void {
    this.todoService.getTodos()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((todos: Todo[]) => this.todos = todos);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
