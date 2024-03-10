import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchPlanDetailComponent } from './lunch-plan-detail.component';

describe('SessionDetailComponent', () => {
  let component: LunchPlanDetailComponent;
  let fixture: ComponentFixture<LunchPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchPlanDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunchPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
