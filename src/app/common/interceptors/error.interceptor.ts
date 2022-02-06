import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, retry, throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 401) {
            this.toastr.error(error.message);
          }
          return throwError(error);
        })
      );
  }
}
