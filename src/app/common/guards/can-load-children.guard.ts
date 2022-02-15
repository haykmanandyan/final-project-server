import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ShowContentService} from "../services/show-content.service";

@Injectable({
  providedIn: 'root'
})
export class CanLoadChildrenGuardGuard implements CanLoad {

  constructor(
    private showContentService: ShowContentService,
  ) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  }
}
