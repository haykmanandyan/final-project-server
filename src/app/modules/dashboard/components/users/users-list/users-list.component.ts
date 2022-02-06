import {Subject, takeUntil} from "rxjs";
import {User} from "../../../../../common/interfaces";
import {UserService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public users: User[] = [];

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res: User[]) => {
        this.users = res;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
