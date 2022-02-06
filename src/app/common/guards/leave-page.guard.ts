import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CanDeactivate, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LeavePageGuard implements CanDeactivate<{ canDeactivatePage: () => boolean }> {

  canDeactivate(
    component: { canDeactivatePage: () => boolean },
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.canDeactivatePage()) {
      return true;
    } else {
      return confirm('You have unsaved changes, are you sure you want to leave the page?');
    }

  }

}
