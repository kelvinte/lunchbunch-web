import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SuggestionService } from './suggestion.service';
import { AuthService } from './auth.service';
import { AppSettings } from '../app.settings';
import { WebsockModel } from '../model/websock.model';
import { Suggestion } from '../model/suggestion.model';
import { SuggestionWinner } from '../model/suggestion-winner.model';

describe('SuggestionService', () => {
  let service: SuggestionService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SuggestionService,
        { provide: AuthService, useValue: authServiceSpyObj },
      ],
    });
    service = TestBed.inject(SuggestionService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should suggest', () => {
    const suggestionData = {
      restaurant: 'Test Restaurant',
      suggestedBy: 'Test User',
    };
    const websockMsg = new WebsockModel('SUGGEST', suggestionData);

    service.socket = jasmine.createSpyObj('WebSocket', ['send']);
    service.suggest(suggestionData);

    expect(service.socket.send).toHaveBeenCalledWith(
      JSON.stringify(websockMsg),
    );
  });

  it('should end session', () => {
    service.socket = jasmine.createSpyObj('WebSocket', ['send']);
    const websockMsg = new WebsockModel('END_SUGGESTION', {});

    service.endSession();

    expect(service.socket.send).toHaveBeenCalledWith(
      JSON.stringify(websockMsg),
    );
  });

  it('should destroy socket', () => {
    service.socket = jasmine.createSpyObj('WebSocket', ['close']);

    service.destorySocket();

    expect(service.socket.close).toHaveBeenCalled();
  });

  it('should set suggestions', () => {
    const suggestions: Suggestion[] = [
      { restaurant: 'Restaurant A', suggestedBy: 'User A' },
    ];

    spyOn(service.suggestionsEmitter, 'emit');

    service.setSuggestions(suggestions);

    expect(service.suggestions).toEqual(suggestions);
    expect(service.suggestionsEmitter.emit).toHaveBeenCalledWith(suggestions);
  });
});
