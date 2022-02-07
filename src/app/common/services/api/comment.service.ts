import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentInterface} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getComments(): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>(`comments`)
  }

  public getComment(id: number): Observable<CommentInterface> {
    return this.http.get<CommentInterface>(`comments/${id}`)
  }

  public addComment(newComment: CommentInterface): void {
    this.http.post<CommentInterface>(`comments`, newComment)
      .subscribe((comment: CommentInterface) => console.log(comment));
  }

}
