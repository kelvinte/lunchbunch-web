import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { ApiResponse } from '../model/api-response.model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { LunchPlan } from '../model/lunch-plan.model';
import { SuggestionService } from './suggestion.service';

@Injectable({
  providedIn: 'root',
})
export class LunchPlanService {
  lunchPlanCreated = new BehaviorSubject<{
    uuid: string;
    date: string;
    description: string;
  }>(null);
  constructor(
    private http: HttpClient,
    private suggestionService: SuggestionService,
  ) {}

  createLunchPlan(date: string, description: string) {
    return this.http
      .post(AppSettings.LUNCH_PLAN_ENDPOINT, {
        date,
        description,
      })
      .pipe(
        tap(
          (
            data: ApiResponse<{
              id: number;
              uuid: string;
              date: string;
              description: string;
            }>,
          ) => {
            this.lunchPlanCreated.next(data.data);
          },
        ),
      );
  }

  getLunchPlan(uuid: string) {
    return this.http
      .get<ApiResponse<LunchPlan>>(AppSettings.LUNCH_PLAN_ENDPOINT + '/' + uuid)
      .pipe(
        catchError(this.handleError),
        map((resp) => {
          return resp.data;
        }),
        tap((resp) => {
          const suggestions = resp.suggestions;
          this.suggestionService.setSuggestions(suggestions);
        }),
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log(errorRes);
    if (!errorRes.error) {
      return throwError(() => errorMessage);
    }
    if (errorRes.error.title.includes('LP002')) {
      errorMessage = 'Lunch Plan not existing';
    } else if (errorRes.error.title.includes('LP001')) {
      errorMessage = 'Lunch Plan has already ended';
    } else if (errorRes.error.title) {
      errorMessage = errorRes.error.title;
    }
    return throwError(() => errorMessage);
  }
}
