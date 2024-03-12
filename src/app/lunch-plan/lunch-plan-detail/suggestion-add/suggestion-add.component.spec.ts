import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuggestionAddComponent } from './suggestion-add.component';
import { SuggestionService } from '../../../shared/service/suggestion.service';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('SuggestionAddComponent', () => {
  let component: SuggestionAddComponent;
  let fixture: ComponentFixture<SuggestionAddComponent>;
  let suggestionServiceSpy: jasmine.SpyObj<SuggestionService>;
  let errorEmitter = new EventEmitter();
  beforeEach(waitForAsync(() => {
    const spyStub = {
      suggest: jasmine.createSpy('suggest'),
      errorEmitter: errorEmitter.asObservable(),
    };

    TestBed.configureTestingModule({
      declarations: [SuggestionAddComponent],
      imports: [FormsModule],
      providers: [{ provide: SuggestionService, useValue: spyStub }],
    })
      .compileComponents()
      .then(() => {
        suggestionServiceSpy = TestBed.inject(
          SuggestionService,
        ) as jasmine.SpyObj<SuggestionService>;
        fixture = TestBed.createComponent(SuggestionAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form', () => {
    const initialFormState = component.isFormShown;
    component.showForm();
    expect(component.isFormShown).toBe(!initialFormState);
  });
  it('should call suggestion service method when sending suggestion', () => {
    component.isConnected = true;
    const suggestion = { restaurant: 'test resto', suggestedBy: 'me' };
    component.suggestionForm = { value: suggestion } as any;
    component.sendSuggestion();
    expect(suggestionServiceSpy.suggest).toHaveBeenCalledWith(suggestion);
  });
  it('should not call suggestion service method when not connected', () => {
    component.isConnected = false;
    const suggestion = { restaurant: 'test resto', suggestedBy: 'me' };
    component.suggestionForm = { value: suggestion } as any;
    component.sendSuggestion();
    expect(suggestionServiceSpy.suggest).not.toHaveBeenCalled();
  });
  it('should emit end session event', () => {
    spyOn(component.onEndSessionClicked, 'emit');
    component.onEndSession();
    expect(component.onEndSessionClicked.emit).toHaveBeenCalled();
  });
  it('should unsubscribe from error subscription on destroy', () => {
    spyOn(component.errorSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.errorSubscription.unsubscribe).toHaveBeenCalled();
  });
});
