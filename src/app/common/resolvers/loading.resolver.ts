import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CommentService} from "../services";
import {CommentInterface} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class LoadingResolver implements Resolve<CommentInterface[]> {

  constructor(
    private commentService: CommentService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CommentInterface[]> {
    return this.commentService.getComments();
  }

}
