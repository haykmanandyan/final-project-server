import {Subject, takeUntil} from "rxjs";
import {Post} from "../../../../../common/interfaces";
import {PostService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public posts: Post[] = []

  constructor(
    private postService: PostService,
  ) {
  }

  public ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.getPosts()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((posts: Post[]) => this.posts = posts);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
