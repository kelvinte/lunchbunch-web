import { TestBed } from '@angular/core/testing';

import { LunchPlanService } from './lunch-plan.service';

describe('LunchPlanService', () => {
  let service: LunchPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LunchPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
