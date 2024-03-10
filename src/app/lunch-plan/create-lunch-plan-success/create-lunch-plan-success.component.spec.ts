import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLunchPlanSuccessComponent } from './create-lunch-plan-success.component';

describe('CreateLunchPlanSuccessComponent', () => {
  let component: CreateLunchPlanSuccessComponent;
  let fixture: ComponentFixture<CreateLunchPlanSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLunchPlanSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLunchPlanSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
