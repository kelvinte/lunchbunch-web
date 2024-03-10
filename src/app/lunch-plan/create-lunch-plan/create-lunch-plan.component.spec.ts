import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLunchPlanComponent } from './create-lunch-plan.component';

describe('CreateSessionComponent', () => {
  let component: CreateLunchPlanComponent;
  let fixture: ComponentFixture<CreateLunchPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLunchPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateLunchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
