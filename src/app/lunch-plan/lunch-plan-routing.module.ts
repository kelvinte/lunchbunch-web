import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLunchPlanComponent } from './create-lunch-plan/create-lunch-plan.component';
import { authGuard } from '../shared/guard/auth.guard';
import { CreateLunchPlanSuccessComponent } from './create-lunch-plan-success/create-lunch-plan-success.component';
import { LunchPlanHistoryComponent } from './lunch-plan-history/lunch-plan-history.component';
import { JoinLunchPlanComponent } from './join-lunch-plan/join-lunch-plan.component';
import { LunchPlanDetailComponent } from './lunch-plan-detail/lunch-plan-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateLunchPlanComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create-success',
        component: CreateLunchPlanSuccessComponent,
        canActivate: [authGuard],
      },
      {
        path: 'history',
        component: LunchPlanHistoryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'join',
        component: JoinLunchPlanComponent,
      },
      {
        path: ':uuid',
        component: LunchPlanDetailComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LunchPLanRoutingModule {}
