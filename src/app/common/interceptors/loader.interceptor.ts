import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoaderService} from "../services";
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const loaderService = this.injector.get(LoaderService);

    loaderService.show();

    return next
      .handle(req)
      .pipe(
        finalize(() => {
          loaderService.hide();
        })
      );
  }
}
