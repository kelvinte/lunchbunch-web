import { TestBed } from '@angular/core/testing';

import { LunchPlanService } from './lunch-plan.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SuggestionService } from './suggestion.service';
import { ApiResponse } from '../model/api-response.model';
import { AppSettings } from '../app.settings';
import { LunchPlan } from '../model/lunch-plan.model';

describe('LunchPlanService', () => {
  let service: LunchPlanService;
  let httpMock: HttpTestingController;
  let suggestionServiceSpy: jasmine.SpyObj<SuggestionService>;

  beforeEach(() => {
    const suggestionServiceSpyObj = jasmine.createSpyObj('SuggestionService', [
      'setSuggestions',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LunchPlanService,
        { provide: SuggestionService, useValue: suggestionServiceSpyObj },
      ],
    });
    service = TestBed.inject(LunchPlanService);
    httpMock = TestBed.inject(HttpTestingController);
    suggestionServiceSpy = TestBed.inject(
      SuggestionService,
    ) as jasmine.SpyObj<SuggestionService>;
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a lunch plan', () => {
    const date = '2024-03-12';
    const description = 'Lunch plan description';
    const mockApiResponse: ApiResponse<{
      id: number;
      uuid: string;
      date: string;
      description: string;
    }> = {
      data: {
        id: 1,
        uuid: 'uuid1',
        date,
        description,
      },
      status: 202,
      success: true,
      title: 'Request Process Successfully',
    };

    service.createLunchPlan(date, description).subscribe((response) => {
      expect(response.data).toEqual(mockApiResponse.data);
    });

    const req = httpMock.expectOne(AppSettings.LUNCH_PLAN_ENDPOINT);
    expect(req.request.method).toBe('POST');
    req.flush(mockApiResponse);
  });

  it('should get a lunch plan', () => {
    const uuid = 'uuid1';
    const mockLunchPlan: LunchPlan = new LunchPlan(
      '1',
      uuid,
      '2024-03-12',
      'The Description',
      'Me',
      true,
      null,
      null,
      '2024-03-12',
    );

    service.getLunchPlan(uuid).subscribe((lunchPlan) => {
      expect(lunchPlan).toEqual(mockLunchPlan);
    });

    const req = httpMock.expectOne(
      `${AppSettings.LUNCH_PLAN_ENDPOINT}/${uuid}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockLunchPlan });

    expect(suggestionServiceSpy.setSuggestions).toHaveBeenCalledWith(
      mockLunchPlan.suggestions,
    );
  });

  it('should handle errors from the API', () => {
    const errorMessage = 'An unknown error occurred';

    service.getLunchPlan('non-existing-uuid').subscribe({
      error: (err) => {
        expect(err).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne(
      `${AppSettings.LUNCH_PLAN_ENDPOINT}/non-existing-uuid`,
    );

    expect(req.request.method).toBe('GET');
    const apiError = new ApiResponse();
    apiError.success = false;
    apiError.status = 400;

    req.flush(null, { status: 404, statusText: errorMessage });
  });
});
