import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../shared/model/suggestion.model';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../shared/service/suggestion.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './lunch-plan-detail.component.html',
  styleUrl: './lunch-plan-detail.component.css',
})
export class LunchPlanDetailComponent implements OnInit {
  lunchPlanUuid: string;
  connected: boolean;

  initiator: string = 'Kelvin';
  suggestions: Suggestion[];

  constructor(
    private suggestionService: SuggestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lunchPlanUuid = params['uuid'];

      this.suggestionService.suggestionsEmitter.subscribe((suggestions) => {
        this.suggestions = suggestions;
      });

      this.suggestionService.isConnected.subscribe((isConnected) => {
        this.connected = isConnected;
        this.suggestionService.retrieve();
      });

      this.suggestionService.connect(this.lunchPlanUuid);
    });
  }
}
