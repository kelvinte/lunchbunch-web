import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../shared/model/suggestion.model';
import { WebsocketService } from '../../shared/service/websocket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-detail',
  templateUrl: './lunch-plan-detail.component.html',
  styleUrl: './lunch-plan-detail.component.css',
})
export class LunchPlanDetailComponent implements OnInit {
  lunchPlanUuid: string;
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

  constructor(
    private websockService: WebsocketService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lunchPlanUuid = params['uuid'];
      this.websockService.connect(this.lunchPlanUuid);
    });
  }
}
