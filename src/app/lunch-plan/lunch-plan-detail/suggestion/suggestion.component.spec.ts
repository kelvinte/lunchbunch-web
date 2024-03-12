import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionComponent } from './suggestion.component';
import { Suggestion } from '../../../shared/model/suggestion.model';

describe('SuggestionComponent', () => {
  let component: SuggestionComponent;
  let fixture: ComponentFixture<SuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SuggestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    component.suggestion = new Suggestion('Test', 'Test');

    fixture.detectChanges(); // Trigger change detection
    const titleElement =
      fixture.nativeElement.querySelector('#restaurant-name');
    const descriptionElement =
      fixture.nativeElement.querySelector('#suggested-by');

    expect(component).toBeTruthy();
    expect(titleElement.textContent).toContain('Test');
    expect(descriptionElement.textContent).toContain('Test');
  });
});
