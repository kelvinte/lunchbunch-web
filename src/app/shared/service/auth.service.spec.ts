import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/user.model';
import { AppSettings } from '../app.settings';
import { ApiResponse } from '../model/api-response.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API and return user data', () => {
    const mockUser: User = new User();
    mockUser.accessToken = 'zzzz';
    mockUser.expiresAt = new Date().getTime();
    mockUser.email = 'test@test.com';
    mockUser.id = '1';
    mockUser.role = 'ADMIN';

    const apiResponse = new ApiResponse<User>();
    apiResponse.data = mockUser;

    const email = 'test@test.com';
    const password = 'somepassword';
    service.login(email, password).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(AppSettings.LOGIN_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush(apiResponse);
  });

  it('should call register API and return success message', () => {
    const email = 'test@example.com';
    const password = 'password';
    const name = 'Test User';

    service.register(email, password, name).subscribe((response) => {
      expect(response).toBe('Success');
    });

    const req = httpMock.expectOne(AppSettings.REGISTER_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Assuming the register API returns an empty object for success
  });

  it('should handle errors from the API', () => {
    const email = 'test@example.com';
    const password = 'password';
    const errorMessage = 'The email has already been registered';

    service.register(email, password, 'Test User').subscribe({
      error: (err) => {
        expect(err).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne(AppSettings.REGISTER_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush(new ErrorEvent(errorMessage));
  });
});
