import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SuggestionService } from '../../../shared/service/suggestion.service';

@Component({
  selector: 'app-suggestion-add',
  templateUrl: './suggestion-add.component.html',
  styleUrl: './suggestion-add.component.css',
})
export class SuggestionAddComponent {
  isFormShown = false;
  @Input() isConnected = false;
  @ViewChild('suggestionForm') suggestionForm: NgForm;

  constructor(private suggestionService: SuggestionService) {}
  showForm() {
    this.isFormShown = !this.isFormShown;
  }

  sendSuggestion() {
    if (this.isConnected) {
      this.suggestionService.suggest(this.suggestionForm.value);
    }
  }
}
