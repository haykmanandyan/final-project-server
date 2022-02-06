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
  public user: User;
  public post: Post;
  public comment: CommentInterface;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.getCommentInfo();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getCommentInfo(): void {
    this.commentService.getComment(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((comment: CommentInterface) => {
        this.comment = comment;
        this.getPostInfo()
      })
  }

  private getPostInfo() {
    this.postService.getPost(this.comment.postId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.getUser();
      })
  }

  private getUser() {
    this.userService.getUser(this.post.userId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => this.user = user);
  }

}
