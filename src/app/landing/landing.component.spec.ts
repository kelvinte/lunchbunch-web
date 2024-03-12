import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { HeaderComponent } from '../header/header.component';
import { LogoComponent } from '../shared/component/logo/logo.component';
import { AuthService } from '../shared/service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AppRoutingModule } from '../router.module';
import { User } from '../shared/model/user.model';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
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
      declarations: [LandingComponent, LogoComponent],
      imports: [AppRoutingModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LandingComponent);
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

  it('should set isAuthenticated to true if user is authenticated', () => {
    const user = new User();
    user.id = '1';

    userSubject.next({}); // Emitting a non-null user
    expect(component.isAuthenticated).toBeTrue();
  });
  it('should set isAuthenticated to false if user is not authenticated', () => {
    userSubject.next(null); // Emitting a non-null user
    expect(component.isAuthenticated).toBeFalse();
  });
  it('should unsubscribe from authService.user on component destruction', () => {
    spyOn(component.userSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.userSub.unsubscribe).toHaveBeenCalled();
  });
});
