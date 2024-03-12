import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoinLunchPlanComponent } from './join-lunch-plan.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('JoinSessionComponent', () => {
  let component: JoinLunchPlanComponent;
  let fixture: ComponentFixture<JoinLunchPlanComponent>;
  let router: Router;
  let route: ActivatedRoute;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JoinLunchPlanComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JoinLunchPlanComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
      });

    fixture = TestBed.createComponent(JoinLunchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to session page with extracted UUID', () => {
    const linkElement = { value: 'http://localhost:4200/session/12345' };
    component.goToSession(linkElement as any);
    expect(router.navigate).toHaveBeenCalledWith(['../', '12345'], {
      relativeTo: route,
    });
  });

  it('should navigate to session page with extracted UUID for HTTPS link', () => {
    const linkElement = { value: 'https://localhost:4200/session/54321' };
    component.goToSession(linkElement as any);
    expect(router.navigate).toHaveBeenCalledWith(['../', '54321'], {
      relativeTo: route,
    });
  });
  it('should navigate to session page uuid only', () => {
    const linkElement = { value: '54321' };
    component.goToSession(linkElement as any);
    expect(router.navigate).toHaveBeenCalledWith(['../', '54321'], {
      relativeTo: route,
    });
  });

  it('should not navigate if link is not provided', () => {
    const linkElement = { value: '' };
    component.goToSession(linkElement as any);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
