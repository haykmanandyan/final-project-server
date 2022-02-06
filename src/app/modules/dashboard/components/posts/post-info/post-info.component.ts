import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post, User} from "../../../../../common/interfaces";
import {PostService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public user: User;
  public post: Post;

  constructor(
    public activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getPostInfo();
  }

  private getPostInfo(): void {
    this.postService.getPost(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.getUser();
      });
  }

  private getUser() {
    this.userService.getUser(this.post.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((user: User) => this.user = user);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
