import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router.module';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './shared/component/logo/logo.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { CreateLunchPlanComponent } from './lunch-plan/create-lunch-plan/create-lunch-plan.component';
import { JoinLunchPlanComponent } from './lunch-plan/join-lunch-plan/join-lunch-plan.component';
import { LunchPlanDetailComponent } from './lunch-plan/lunch-plan-detail/lunch-plan-detail.component';
import { SuggestionAddComponent } from './lunch-plan/lunch-plan-detail/suggestion-add/suggestion-add.component';
import { SuggestionComponent } from './lunch-plan/lunch-plan-detail/suggestion/suggestion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorAlertComponent } from './shared/component/error-alert/error-alert.component';
import { SuccessAlertComponent } from './shared/component/success-alert/success-alert.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { CreateLunchPlanSuccessComponent } from './lunch-plan/create-lunch-plan-success/create-lunch-plan-success.component';
import { SuggestionWinnerComponent } from './lunch-plan/lunch-plan-detail/suggestion-winner/suggestion-winner.component';
import { LunchPlanHistoryComponent } from './lunch-plan/lunch-plan-history/lunch-plan-history.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    LogoComponent,
    SuggestionComponent,
    SuggestionAddComponent,
    LandingComponent,
    FooterComponent,
    CreateLunchPlanComponent,
    JoinLunchPlanComponent,
    LunchPlanDetailComponent,
    AuthComponent,
    ErrorAlertComponent,
    SuccessAlertComponent,
    CreateLunchPlanSuccessComponent,
    SuggestionWinnerComponent,
    LunchPlanHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
