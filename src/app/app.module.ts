import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router.module';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './shared/component/logo/logo.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { CreateSessionComponent } from './session/create-session/create-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { SessionDetailComponent } from './session/session-detail/session-detail.component';
import { SuggestionAddComponent } from './session/session-detail/suggestion-add/suggestion-add.component';
import { SuggestionComponent } from './session/session-detail/suggestion/suggestion.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/component/loading/loading.component';
import { ErrorAlertComponent } from './shared/component/error-alert/error-alert.component';
import { SuccessAlertComponent } from './shared/component/success-alert/success-alert.component';

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
    CreateSessionComponent,
    JoinSessionComponent,
    SessionDetailComponent,
    AuthComponent,
    LoadingComponent,
    ErrorAlertComponent,
    SuccessAlertComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
