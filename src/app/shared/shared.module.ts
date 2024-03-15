import { NgModule } from '@angular/core';
import { LogoComponent } from './component/logo/logo.component';
import { ErrorAlertComponent } from './component/error-alert/error-alert.component';
import { SuccessAlertComponent } from './component/success-alert/success-alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LogoComponent, ErrorAlertComponent, SuccessAlertComponent],
  imports: [CommonModule],
  exports: [
    LogoComponent,
    ErrorAlertComponent,
    SuccessAlertComponent,
    CommonModule,
  ],
})
export class SharedModule {}
