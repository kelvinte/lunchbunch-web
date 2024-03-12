import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateLunchPlanSuccessComponent } from './create-lunch-plan-success.component';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreateLunchPlanSuccessComponent', () => {
  let component: CreateLunchPlanSuccessComponent;
  let fixture: ComponentFixture<CreateLunchPlanSuccessComponent>;
  let lunchPlanService: LunchPlanService;
  let router: Router;
  let route: ActivatedRoute;

  let lunchPlanCreatedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLunchPlanSuccessComponent],
      providers: [
        {
          provide: LunchPlanService,
          useValue: { lunchPlanCreated: of({}) },
        },
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
        fixture = TestBed.createComponent(CreateLunchPlanSuccessComponent);
        component = fixture.componentInstance;
        lunchPlanService = TestBed.inject(LunchPlanService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to session page when goToSession is called', () => {
    component.uuid = '12345';
    component.goToSession();
    expect(router.navigate).toHaveBeenCalledWith(['../', '12345'], {
      relativeTo: route,
    });
  });

  it('should unsubscribe from lunchPlanSubscription on destroy', () => {
    spyOn(component.lunchPlanSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.lunchPlanSubscription.unsubscribe).toHaveBeenCalled();
  });
});
