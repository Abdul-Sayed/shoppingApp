import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  Subject,
  throwError,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  kind?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`;
  signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

  user = new BehaviorSubject<User | null>(null);
  userToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post<AuthResponseData>(this.signUpURL, body).pipe(
      tap((response: AuthResponseData) => {
        this.setUserSessionTime(response);
        this.userToken.next(response.idToken);
      }),
      catchError((errorRes: HttpErrorResponse) =>
        this.handleErrorCases(errorRes)
      )
    );
  }

  signIn(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponseData>(this.signInURL, body).pipe(
      tap((response: AuthResponseData) => {
        console.log(response);
        this.setUserSessionTime(response);
        this.userToken.next(response.idToken);
      }),
      catchError((errorRes: HttpErrorResponse) =>
        this.handleErrorCases(errorRes)
      )
    );
  }

  private setUserSessionTime(response: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    console.log(expirationDate);
    this.user.next(
      new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      )
    );
  }

  private handleErrorCases(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    try {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email you entered has already been registered';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'The email you entered is not registered';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'You entered a wrong password';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Please try again later.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Signin temporarily blocked';
          break;
        default:
          errorMessage = `${errorMessage}: ${errorRes.error.error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    } catch (error) {
      return throwError(() => new Error('Server is down'));
    }
  }
}
