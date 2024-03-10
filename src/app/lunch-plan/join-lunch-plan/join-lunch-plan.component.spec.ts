import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinLunchPlanComponent } from './join-lunch-plan.component';

describe('JoinSessionComponent', () => {
  let component: JoinLunchPlanComponent;
  let fixture: ComponentFixture<JoinLunchPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinLunchPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinLunchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
