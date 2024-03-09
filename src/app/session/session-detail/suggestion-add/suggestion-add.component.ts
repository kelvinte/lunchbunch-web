import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion-add',
  templateUrl: './suggestion-add.component.html',
  styleUrl: './suggestion-add.component.css',
})
export class SuggestionAddComponent {
  isFormShown = false;
  showForm() {
    this.isFormShown = !this.isFormShown;
  }
}
