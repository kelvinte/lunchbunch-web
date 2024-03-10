import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        // const header = req.headers;
        // header.set('Authorization', 'Bearer ' + user.accessToken);
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + user.accessToken,
          ),
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
