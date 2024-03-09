import { Component } from '@angular/core';
import { Suggestion } from '../../shared/model/suggestion.model';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrl: './session-detail.component.css',
})
export class SessionDetailComponent {
  initiator: string = 'Kelvin';
  suggestions: Suggestion[] = [
    new Suggestion(
      'Jollibee',
      'https://ucarecdn.com/a7c29c6d-f230-4755-b047-80ea5a2b8dd7/-/crop/547x544/111,76/-/format/auto/-/resize/240x/',
      'A filipino fast food etc',
    ),
    new Suggestion(
      'Jollibee',
      'https://ucarecdn.com/a7c29c6d-f230-4755-b047-80ea5a2b8dd7/-/crop/547x544/111,76/-/format/auto/-/resize/240x/',
      'A filipino fast food etc',
    ),
    new Suggestion(
      'Jollibee',
      'https://ucarecdn.com/a7c29c6d-f230-4755-b047-80ea5a2b8dd7/-/crop/547x544/111,76/-/format/auto/-/resize/240x/',
      'A filipino fast food etc',
    ),
    new Suggestion(
      'Jollibee',
      'https://ucarecdn.com/a7c29c6d-f230-4755-b047-80ea5a2b8dd7/-/crop/547x544/111,76/-/format/auto/-/resize/240x/',
      'A filipino fast food etc',
    ),
  ];
}
