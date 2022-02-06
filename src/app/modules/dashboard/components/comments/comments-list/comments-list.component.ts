import {Subject, takeUntil} from "rxjs";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../../../../common/services";
import {CommentInterface} from "../../../../../common/interfaces";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public comments: CommentInterface[] = [];

  constructor(
    private commentService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.getComments();
  }

  private getComments(): void {
    this.commentService.getComments()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((comments: CommentInterface[]) => this.comments = comments);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
