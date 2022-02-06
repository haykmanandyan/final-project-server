import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentInterface, Post, User} from "../../../../../common/interfaces";
import {CommentService, PostService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.scss']
})
export class CommentInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public user: User;

  public post: Post;

  public comment: CommentInterface;


  constructor(
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.commentService.getComment(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((comment: CommentInterface) => {
        this.comment = comment;
        this.postService.getPost(this.comment.postId)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((post: Post) => {
            this.post = post;
            this.userService.getUser(this.post.userId)
              .pipe(
                takeUntil(this.destroy$),
              )
              .subscribe((user: User) => this.user = user);
          })
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
