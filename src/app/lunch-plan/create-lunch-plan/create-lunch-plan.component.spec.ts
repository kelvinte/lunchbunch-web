import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateLunchPlanComponent } from './create-lunch-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { BehaviorSubject, of } from 'rxjs';

describe('CreateLunchPlanComponent', () => {
  let component: CreateLunchPlanComponent;
  let fixture: ComponentFixture<CreateLunchPlanComponent>;
  let lunchPlanService: any;
  let router: Router;
  let lunchPlanSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLunchPlanComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: LunchPlanService,
          useValue: {
            createLunchPlan: jasmine
              .createSpy()
              .and.returnValue(lunchPlanSubject),
          },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CreateLunchPlanComponent);
        component = fixture.componentInstance;
        lunchPlanService = TestBed.inject(
          LunchPlanService,
        ) as jasmine.SpyObj<LunchPlanService>;
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with current date', () => {
    const currentDate = new Date().toISOString().substring(0, 10);
    expect(component.createForm.value.date).toBe(currentDate);
  });

  it('should navigate to create-success page after successful lunch plan creation', () => {
    component.createForm.setValue({
      date: '2024-03-12',
      description: 'Test lunch plan',
    });
    component.createLunchPlan();
    expect(lunchPlanService.createLunchPlan).toHaveBeenCalledWith(
      '2024-03-12',
      'Test lunch plan',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/session/create-success']);
  });
});
