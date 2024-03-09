import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ApiResponse } from '../model/api-response.model';
import { User } from '../model/user.model';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private autoLogoutTimeout;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(AppSettings.LOGIN_ENDPOINT, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resp: ApiResponse<User>) => {
          this.handleAuthentication(resp.data);
        }),
        map((data: ApiResponse<User>) => {
          return data.data;
        }),
      );
  }

  register(email: string, password: string, name: string) {
    return this.http
      .post(AppSettings.REGISTER_ENDPOINT, {
        email,
        password,
        name,
      })
      .pipe(
        catchError(this.handleError),
        map((data: ApiResponse<any>) => {
          return 'okay';
        }),
      );
  }
  private handleAuthentication(user: User) {
    this.autoLogout(user.expiresAt);
    localStorage.setItem('loginData', JSON.stringify(user));
    this.user.next(user);
  }

  autoLogout(expirationDuration: number) {
    expirationDuration = expirationDuration - 30_000;
    this.autoLogoutTimeout = setTimeout(() => {
      this.logout();
    }, expirationDuration * 1000);
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('loginData'));
    if (!user) {
      return;
    }

    if (user) {
      const expirationDuration =
        new Date(user.expiresAt).getTime() - new Date().getTime();
      if (expirationDuration < 0) {
        return;
      }

      this.user.next(user);
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('loginData');
    if (this.autoLogoutTimeout) {
      clearTimeout(this.autoLogoutTimeout);
    }
    this.autoLogoutTimeout = null;
    this.router.navigate(['/']);
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log(errorRes);
    if (!errorRes.error) {
      return throwError(() => errorMessage);
    }
    if (errorRes.error.title.includes('AUTH002')) {
      errorMessage = 'The email has already been registered';
    }
    return throwError(() => errorMessage);
  }
}
