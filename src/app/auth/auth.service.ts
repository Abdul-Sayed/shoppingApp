import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
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
  signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
  signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

  user = new BehaviorSubject<User | null>(null);
  userToken = new BehaviorSubject<string>('');
  sessionExpiration: number;

  constructor(private http: HttpClient, private router: Router) {}

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

  signOut() {
    this.userToken.next('');
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
    console.log('logged out');
  }

  autoSignIn() {
    // retrieve the current user for this session from localStorage
    const currentUser: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!currentUser) {
      return;
    }

    const loadedUser = new User(
      currentUser.email,
      currentUser.id,
      currentUser._token,
      new Date(currentUser._tokenExpirationDate)
    );

    // Broadcase the user and token to the application and sign out upon token expiration
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.userToken.next(loadedUser.token);
      this.autoSignOut(
        new Date(currentUser._tokenExpirationDate).getTime() -
          new Date().getTime()
      );
    }
  }

  autoSignOut(expiry: number) {
    console.log(expiry);
    setTimeout(() => {
      this.signOut();
    }, expiry);
  }

  isAuthenticated() {}

  private setUserSessionTime(response: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );
    this.user.next(user);
    this.userToken.next(response.idToken);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(user.token));
    this.autoSignOut(+response.expiresIn * 1000);
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
