import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../../common/interfaces";
import {Todo} from "../../../../../common/interfaces/todo";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent implements OnInit, OnDestroy {
  public todo: Todo;
  public user: User;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getTodoInfo();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getTodoInfo(): void {
    this.todoService.getTodo(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((todo: Todo) => {
        this.todo = todo;
        this.getUser();
      })
  }

  private getUser() {
    this.userService.getUser(this.todo.userId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => this.user = user)
  }

}
