import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionWinnerComponent } from './suggestion-winner.component';

describe('SuggestionWinnerComponent', () => {
  let component: SuggestionWinnerComponent;
  let fixture: ComponentFixture<SuggestionWinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionWinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
