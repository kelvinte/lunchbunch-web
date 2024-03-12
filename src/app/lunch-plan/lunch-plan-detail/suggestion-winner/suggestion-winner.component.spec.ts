import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuggestionWinnerComponent } from './suggestion-winner.component';
import { Router } from '@angular/router';

describe('SuggestionWinnerComponent', () => {
  let component: SuggestionWinnerComponent;
  let fixture: ComponentFixture<SuggestionWinnerComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionWinnerComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SuggestionWinnerComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to home when close button is clicked', () => {
    component.onClickClose();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
