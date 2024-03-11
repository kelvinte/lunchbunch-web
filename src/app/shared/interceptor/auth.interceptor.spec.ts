import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { SuggestionService } from '../service/suggestion.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authServiceSpyObj },
      ],
    });
    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


});
