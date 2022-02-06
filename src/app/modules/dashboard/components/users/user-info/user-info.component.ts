import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Post, User} from "../../../../../common/interfaces";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  public user: User;
  public posts: Post[] = [];
  private destroy$ = new Subject<void>()

  constructor(
    public activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
  ) {
  }

  public ngOnInit(): void {
    this.getUser();
    this.getUserPosts();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getUser(): void {
    this.userService.getUser(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => this.user = user);
  }

  private getUserPosts() {
    this.postService.getUserPosts(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((posts: Post[]) => this.posts = posts);
  }

}
