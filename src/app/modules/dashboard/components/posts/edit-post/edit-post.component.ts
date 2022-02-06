import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Post, User} from "../../../../../common/interfaces";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public minUserId: number;
  public maxUserId: number;
  public currentUserId: number;

  public addMode = this.activatedRoute.snapshot.url[0]["path"] === 'add-new-post';

  public postForm: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'userId': new FormControl(null, Validators.required),
    'title': new FormControl(null),
    'body': new FormControl(null),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService: PostService,
    private toastr: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    this.addMode ? this.getUsersIds() : this.getPost();
  }

  private canDeactivatePage(): boolean {
    return !this.postForm.dirty;
  }

  private getUsersIds(): void {
    this.userService.getUsers()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((users: User[]) => {
        this.minUserId = users[0].id;
        this.maxUserId = users[users.length - 1].id;
        this.postForm.get('userId').addValidators(
          [Validators.min(this.minUserId), Validators.max(this.maxUserId)]
        )
      })
  }

  private getPost(): void {
    this.postService.getPost(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((post: Post) => {
        this.currentUserId = post.userId;
        this.postForm.setValue(post);
      })
  }

  public onSubmit(): void {
    if (!this.postForm.valid) {
      this.toastr.error('The form is invalid!');
      return;
    }
    if (!this.addMode) {
      this.postService.editCurrentPost(this.postForm.value);

    } else {
      this.postService.addPost(this.postForm.value);
    }
    this.postForm.markAsPristine();
    this.router.navigate(['/dashboard/posts/posts-list'])
  }

  public onReset(): void {
    if (this.postForm.dirty && confirm('You have some changes. Are you sure you want reset form?')) {
      this.getPost();
      this.postForm.markAsPristine();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
