import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../../../common/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public boolValues = {
    'Yes': true,
    'No': false,
  };
  public minUserId: number;
  public maxUserId: number;

  public todoForm: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'userId': new FormControl(null, [
      Validators.required,
    ]),
    'title': new FormControl(null),
    'completed': new FormControl(false, Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private todoService: TodoService,
    private toastr: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsersIds();
  }

  private canDeactivatePage(): boolean {
    return !this.todoForm.dirty;
  }

  private getUsersIds(): void {
    this.userService.getUsers()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((users: User[]) => {
        this.minUserId = users[0].id;
        this.maxUserId = users[users.length - 1].id;
        this.todoForm.get('userId').addValidators(
          [Validators.min(this.minUserId), Validators.max(this.maxUserId)]
        )
      })
  }

  public onSubmit(): void {
    if (!this.todoForm.valid) {
      this.toastr.error('The form is invalid!');
      return;
    }

    this.todoService.addTodo(this.todoForm.value);
    this.todoForm.markAsPristine();
    this.router.navigate(['/dashboard/todos/todos-list']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
