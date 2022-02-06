import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

enum API {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              switch (request.method) {
                case API.POST:
                  this.toastr.success(
                    "Object created.", '', {positionClass: 'toast-bottom-right'}
                  );
                  break;
                case API.PUT:
                  this.toastr.success(
                    "Object created.", '', {positionClass: 'toast-bottom-right'}
                  );
                  break;
                case API.PATCH:
                  this.toastr.success(
                    "Object edited.", '', {positionClass: 'toast-bottom-right'}
                  );
                  break;
                case API.DELETE:
                  this.toastr.info(
                    "Object deleted.", '', {positionClass: 'toast-bottom-right'}
                  );
                  break;
                default:
              }
            }
          }
        )
      );
  }
}
