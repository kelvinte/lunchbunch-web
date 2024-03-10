import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { ApiResponse } from '../model/api-response.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LunchPlanService {
  lunchPlanCreated = new BehaviorSubject<{
    uuid: string;
    date: string;
    description: string;
  }>(null);
  constructor(private http: HttpClient) {}

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

  getLunchPlan(uuid: string) {}
}
