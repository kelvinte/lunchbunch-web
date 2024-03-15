import { NgModule } from '@angular/core';
import { CreateLunchPlanComponent } from './create-lunch-plan/create-lunch-plan.component';
import { JoinLunchPlanComponent } from './join-lunch-plan/join-lunch-plan.component';
import { LunchPlanDetailComponent } from './lunch-plan-detail/lunch-plan-detail.component';
import { SuggestionComponent } from './lunch-plan-detail/suggestion/suggestion.component';
import { SuggestionAddComponent } from './lunch-plan-detail/suggestion-add/suggestion-add.component';
import { CreateLunchPlanSuccessComponent } from './create-lunch-plan-success/create-lunch-plan-success.component';
import { SuggestionWinnerComponent } from './lunch-plan-detail/suggestion-winner/suggestion-winner.component';
import { LunchPlanHistoryComponent } from './lunch-plan-history/lunch-plan-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LunchPLanRoutingModule } from './lunch-plan-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateLunchPlanComponent,
    JoinLunchPlanComponent,
    LunchPlanDetailComponent,
    SuggestionComponent,
    SuggestionAddComponent,
    CreateLunchPlanSuccessComponent,
    SuggestionWinnerComponent,
    LunchPlanHistoryComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LunchPLanRoutingModule,
    SharedModule,
  ],
})
export class LunchPlanModule {}
