import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionWinner } from '../../../shared/model/suggestion-winner.model';

@Component({
  selector: 'app-suggestion-winner',
  templateUrl: './suggestion-winner.component.html',
  styleUrl: './suggestion-winner.component.css',
})
export class SuggestionWinnerComponent {
  @Input() winner: SuggestionWinner;

  constructor(private router: Router) {}
  onClickClose() {
    this.router.navigate(['/']);
  }
}
