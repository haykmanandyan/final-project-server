import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Post} from "../../../../../common/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService, PostService} from "../../../../../common/services";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public minPostId: number;
  public maxPostId: number;

  public commentForm: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'postId': new FormControl(null, [
      Validators.required,
    ]),
    'name': new FormControl(null),
    'email': new FormControl(null, Validators.email),
    'body': new FormControl(null),
  });

  constructor(
    private router: Router,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private toastr: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.getPostsIds();
  }

  private getPostsIds(): void {
    this.postService.getPosts()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((posts: Post[]) => {
        this.minPostId = posts[0].id;
        this.maxPostId = posts[posts.length - 1].id;
        this.commentForm.get('postId').addValidators(
          [Validators.min(this.minPostId), Validators.max(this.maxPostId)]
        )
      })
  }

  private canDeactivatePage(): boolean {
    return !this.commentForm.dirty;
  }

  public onSubmit(): void {
    if (!this.commentForm.valid) {
      this.toastr.error('The form is invalid!');
      return;
    }

    this.commentService.addComment(this.commentForm.value);
    this.commentForm.markAsPristine();
    this.router.navigate(['/dashboard/comments/comments-list']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
