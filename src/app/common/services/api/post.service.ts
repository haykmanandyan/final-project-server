import {Observable} from "rxjs";
import {Post} from "../../interfaces";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`posts`)
  }

  public getPost(id: number): Observable<Post> {
    return this.http
      .get<Post>(`posts/${id}`)
  }

  public getUserPosts(id: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`posts`,
        {params: {'userId': id}})
  }

  public addPost(newPost: Post): void {
    this.http
      .post<Post>(`posts`, newPost)
      .subscribe((post: Post) => console.log(post));
  }

  public editCurrentPost(editPost: Post): void {
    this.http
      .patch<Post>(`posts/${editPost.id}`, editPost)
      .subscribe((post: Post) => console.log(post));
  }
}
