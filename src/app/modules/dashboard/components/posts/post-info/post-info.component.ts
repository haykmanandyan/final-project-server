import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Post, User} from "../../../../../common/interfaces";
import {Component, OnDestroy, OnInit} from '@angular/core';
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
    this.getData();
  }

  private getData(): void {
    this.postService.getPost(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.userService.getUser(this.post.userId)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((user: User) => this.user = user);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
