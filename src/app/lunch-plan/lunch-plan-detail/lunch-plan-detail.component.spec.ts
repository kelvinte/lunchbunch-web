import { TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LunchPlanDetailComponent } from './lunch-plan-detail.component';
import { SuggestionService } from '../../shared/service/suggestion.service';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { ApiResponse } from '../../shared/model/api-response.model';
import { SuggestionWinner } from '../../shared/model/suggestion-winner.model';
import { EventEmitter } from '@angular/core';
import { SuggestionAddComponent } from './suggestion-add/suggestion-add.component';
import { MockComponent } from 'ng-mocks';
import { LunchPlan } from '../../shared/model/lunch-plan.model';

describe('LunchPlanDetailComponent', () => {
  let component: LunchPlanDetailComponent;
  let fixture: ComponentFixture<LunchPlanDetailComponent>;
  let suggestionService: SuggestionService;
  let lunchPlanService: LunchPlanService;
  let route: ActivatedRoute;
  let router: Router;
  let suggestionEmitter = new EventEmitter();
  let isConnectedEmitter = new EventEmitter();
  let winnerEmitter = new EventEmitter();

  const plan = new LunchPlan(
    '1',
    'uuid',
    '2024-01-01',
    'desc',
    'me',
    true,
    null,
    null,
  );
  let getLunchPlanSubject = new BehaviorSubject(plan);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LunchPlanDetailComponent,
        MockComponent(SuggestionAddComponent),
      ],
      providers: [
        {
          provide: SuggestionService,
          useValue: {
            suggestionsEmitter: suggestionEmitter.asObservable(),
            isConnected: isConnectedEmitter.asObservable(),
            winnerEmitter: winnerEmitter.asObservable(),
            connect: jasmine.createSpy(),
            destorySocket: jasmine.createSpy(),
            endSession: jasmine.createSpy(),
          },
        },
        {
          provide: LunchPlanService,
          useValue: {
            getLunchPlan: jasmine
              .createSpy()
              .and.returnValue(getLunchPlanSubject),
          },
        },

        { provide: ActivatedRoute, useValue: { params: of({ uuid: '1234' }) } },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LunchPlanDetailComponent);
        component = fixture.componentInstance;
        suggestionService = TestBed.inject(SuggestionService);
        lunchPlanService = TestBed.inject(LunchPlanService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch lunch plan details on init', fakeAsync(() => {
  //   const mockLunchPlan = {
  //     description: 'Test Lunch',
  //     date: '2024-04-01',
  //     initiator: 'John Doe',
  //     owner: true,
  //   };
  //   spyOn(lunchPlanService, 'getLunchPlan').and.returnValue(
  //     of(new ApiResponse<LunchPlanDetail>(mockLunchPlan))
  //   );
  //
  //   tick(); // Trigger ngOnInit
  //
  //   expect(lunchPlanService.getLunchPlan).toHaveBeenCalledWith('1234');
  //   expect(component.description).toBe(mockLunchPlan.description);
  //   expect(component.date).toBe(mockLunchPlan.date);
  //   expect(component.initiator).toBe(mockLunchPlan.initiator);
  //   expect(component.isOwner).toBe(mockLunchPlan.owner);
  // }));

  // ... Add more tests for other component behaviors and interactions
});
