import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from '../shared/service/auth.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpyObj: any;
  let routerSpyObj: any;
  beforeEach(waitForAsync(() => {
    authServiceSpyObj = jasmine.createSpyObj('AuthService', ['login']);
    authServiceSpyObj.login.and.returnValue(of({ user: 'test_user' })); // Mock successful login
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
      imports: [FormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoginMode false and error/success null', () => {
    expect(component.isLoginMode).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.successMessage).toBeNull();
  });

  it('should toggle isLoginMode and clear error/success messages', () => {
    component.toggleAuthMode();

    expect(component.isLoginMode).toBeTrue();
    expect(component.error).toBeNull();
    expect(component.successMessage).toBeNull();

    component.toggleAuthMode();
    expect(component.isLoginMode).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.successMessage).toBeNull();
  });
  it('should call login on AuthService and navigate on successful login (login mode)', () => {
    setTimeout(() => {
      component.authForm.setValue({
        email: 'test@example.com',
        password: 'password123',
      });
      component.onSubmit();

      expect(authServiceSpyObj.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
      expect(routerSpyObj.navigate).toHaveBeenCalledWith(['/']);
    }, 1000);
  });
});
