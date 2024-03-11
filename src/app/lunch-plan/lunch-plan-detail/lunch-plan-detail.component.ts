import { Component, OnDestroy, OnInit } from '@angular/core';
import { Suggestion } from '../../shared/model/suggestion.model';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../shared/service/suggestion.service';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { ApiResponse } from '../../shared/model/api-response.model';
import { SuggestionWinner } from '../../shared/model/suggestion-winner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-detail',
  templateUrl: './lunch-plan-detail.component.html',
  styleUrl: './lunch-plan-detail.component.css',
})
export class LunchPlanDetailComponent implements OnInit, OnDestroy {
  lunchPlanUuid: string;
  initiator: string;
  date: string;
  description: string;

  connected: boolean;
  isOwner: boolean;

  suggestions: Suggestion[];
  winner: SuggestionWinner;
  error = null;

  suggestionSubscription: Subscription;
  connectedSubscription: Subscription;
  winnerSubscription: Subscription;
  constructor(
    private lunchplanService: LunchPlanService,
    private suggestionService: SuggestionService,
    private route: ActivatedRoute,
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
          this.winner = lunchPlan.winner;
        },
        error: (error) => {
          this.error = error;
        },
      });

      this.suggestionSubscription =
        this.suggestionService.suggestionsEmitter.subscribe((suggestions) => {
          this.suggestions = suggestions;
        });

      this.connectedSubscription = this.suggestionService.isConnected.subscribe(
        (isConnected) => {
          this.connected = isConnected;
        },
      );

      this.winnerSubscription = this.suggestionService.winnerEmitter.subscribe(
        (winner) => {
          this.winner = winner;
        },
      );

      this.suggestionService.connect(this.lunchPlanUuid);
    });
  }

  ngOnDestroy() {
    this.suggestionService.destorySocket();
    this.winnerSubscription.unsubscribe();
    this.connectedSubscription.unsubscribe();
    this.suggestionSubscription.unsubscribe();
  }

  endSession() {
    this.suggestionService.endSession();
  }
}
