import { Component, Input } from '@angular/core';
import { Suggestion } from '../../../shared/model/suggestion.model';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css',
})
export class SuggestionComponent {
  @Input() suggestion: Suggestion;
}
