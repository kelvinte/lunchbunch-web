import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LunchPlanHistoryComponent } from './lunch-plan-history.component';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LunchPlan } from '../../shared/model/lunch-plan.model';
import { SuggestionWinner } from '../../shared/model/suggestion-winner.model';
import { PaginatedResponse } from '../../shared/model/paginated-response.model';

describe('LunchPlanHistoryComponent', () => {
  let component: LunchPlanHistoryComponent;
  let fixture: ComponentFixture<LunchPlanHistoryComponent>;
  let lunchPlanHistorySubject: BehaviorSubject<PaginatedResponse<LunchPlan[]>>;
  let mockLunchPlanService: any;
  beforeEach(waitForAsync(() => {
    lunchPlanHistorySubject = new BehaviorSubject<
      PaginatedResponse<LunchPlan[]>
    >(null);

    let lunchPlan = new LunchPlan(
      '1',
      'uuid',
      '2024-03-14',
      'description',
      'me',
      true,
      new SuggestionWinner('resto', 'them', '2024-03-14'),
      null,
      '2024-03-14',
    );

    let paginatedResponse = new PaginatedResponse<LunchPlan[]>();
    paginatedResponse.page = 1;
    paginatedResponse.result = [lunchPlan];
    lunchPlanHistorySubject.next(paginatedResponse);

    mockLunchPlanService = jasmine.createSpyObj('LunchPlanService', [
      'getLunchPlanHistory',
    ]);

    mockLunchPlanService.getLunchPlanHistory.and.returnValue(
      lunchPlanHistorySubject.asObservable(),
    );

    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { params: {} },
    });

    TestBed.configureTestingModule({
      declarations: [LunchPlanHistoryComponent],
      providers: [
        { provide: LunchPlanService, useValue: mockLunchPlanService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LunchPlanHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
