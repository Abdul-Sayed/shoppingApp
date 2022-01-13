import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`;
  signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    if (request.url === this.signUpURL || request.url === this.signInURL) {
      return next.handle(request);
    } else {
      return this.authService.userToken.pipe(
        take(1),
        exhaustMap((token) => {
          if (!!token === false) {
            return next.handle(request);
          } else {
            return next.handle(
              request.clone({ params: new HttpParams().set('auth', token) })
            );
          }
        })
      );
    }
  }
}
