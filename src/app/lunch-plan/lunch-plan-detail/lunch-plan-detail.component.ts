import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../shared/model/suggestion.model';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../shared/service/suggestion.service';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { ApiResponse } from '../../shared/model/api-response.model';

@Component({
  selector: 'app-session-detail',
  templateUrl: './lunch-plan-detail.component.html',
  styleUrl: './lunch-plan-detail.component.css',
})
export class LunchPlanDetailComponent implements OnInit {
  lunchPlanUuid: string;
  initiator: string;
  date: string;
  description: string;

  connected: boolean;
  isOwner: boolean;

  suggestions: Suggestion[];

  error = null;

  constructor(
    private lunchplanService: LunchPlanService,
    private suggestionService: SuggestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lunchPlanUuid = params['uuid'];

      this.lunchplanService.getLunchPlan(this.lunchPlanUuid).subscribe({
        next: (lunchPlan) => {
          this.description = lunchPlan.description;
          this.date = lunchPlan.date;
          this.initiator = lunchPlan.initiator;
          this.isOwner = lunchPlan.owner;
        },
        error: (error) => {
          this.error = error;
        },
      });

      this.suggestionService.suggestionsEmitter.subscribe((suggestions) => {
        this.suggestions = suggestions;
      });

      this.suggestionService.isConnected.subscribe((isConnected) => {
        this.connected = isConnected;
      });

      this.suggestionService.connect(this.lunchPlanUuid);
    });
  }

  endSession() {
    console.log('sending end');
  }
}
