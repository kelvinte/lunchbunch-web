import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SuggestionService } from '../../../shared/service/suggestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion-add',
  templateUrl: './suggestion-add.component.html',
  styleUrl: './suggestion-add.component.css',
})
export class SuggestionAddComponent implements OnInit, OnDestroy {
  isFormShown = false;
  @Input() isConnected = false;
  @ViewChild('suggestionForm') suggestionForm: NgForm;
  @Input() isOwner = false;
  @Input() endSuggestionDisabled = false;
  @Output() onEndSessionClicked = new EventEmitter();

  errorSubscription: Subscription;

  error = null;
  constructor(private suggestionService: SuggestionService) {}

  ngOnInit() {
    this.errorSubscription = this.suggestionService.errorEmitter.subscribe(
      (error) => {
        this.error = error;
      },
    );
  }
  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  showForm() {
    this.isFormShown = !this.isFormShown;
  }

  sendSuggestion() {
    if (this.isConnected) {
      this.suggestionService.suggest(this.suggestionForm.value);
    }
  }

  onEndSession() {
    this.onEndSessionClicked.emit();
  }
}
