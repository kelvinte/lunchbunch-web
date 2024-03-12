// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
//
// import { HeaderComponent } from './header.component';
// import { LogoComponent } from '../shared/component/logo/logo.component';
// import { AuthService } from '../shared/service/auth.service';
// import { BehaviorSubject } from 'rxjs';
// import { User } from '../shared/model/user.model';
//
// const user = new User();
// user.id = '1';
// const userData = new BehaviorSubject(user);
//
// fdescribe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//
//   let authSpy;
//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [HeaderComponent, LogoComponent],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             user: userData,
//           },
//         },
//       ],
//     })
//       .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(HeaderComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//       });
//
//     authSpy = TestBed.inject(AuthService);
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should call authservice logouot on logout', () => {
//     component.logout();
//
//     expect(authSpy.logout).toHaveBeenCalledTimes(1);
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../shared/service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/model/user.model';
import { LogoComponent } from '../shared/component/logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let authServiceStub: any;
  let userSubject: BehaviorSubject<any>;

  beforeEach(waitForAsync(() => {
    userSubject = new BehaviorSubject(null);

    authServiceStub = {
      user: userSubject.asObservable(),
      logout: jasmine.createSpy('logout'),
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(
          AuthService,
        ) as jasmine.SpyObj<AuthService>;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isAuthenticated to false when user is not authenticated', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should set isAuthenticated to true when user is authenticated', () => {
    const user = new User();
    user.id = '1';

    userSubject.next(user); // Emitting a non-null user
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should call authService.logout() when logout is called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should unsubscribe from authService.user on component destruction', () => {
    spyOn(component.userSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.userSub.unsubscribe).toHaveBeenCalled();
  });
});
