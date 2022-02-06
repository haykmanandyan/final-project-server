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
  private destroy$ = new Subject<void>();

  public todo: Todo;
  public user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.todoService.getTodo(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((todo: Todo) => {
        this.todo = todo;
        this.userService.getUser(this.todo.userId)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((user: User) => this.user = user)
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
