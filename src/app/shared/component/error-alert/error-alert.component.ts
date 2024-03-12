import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css',
})
export class ErrorAlertComponent {
  @Output() onCloseClick = new EventEmitter<void>();
  onClose() {
    this.onCloseClick.emit();
  }
}
