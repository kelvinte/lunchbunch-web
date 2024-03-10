import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { LunchPlanDetailComponent } from './lunch-plan/lunch-plan-detail/lunch-plan-detail.component';
import { CreateLunchPlanComponent } from './lunch-plan/create-lunch-plan/create-lunch-plan.component';
import { JoinLunchPlanComponent } from './lunch-plan/join-lunch-plan/join-lunch-plan.component';
import { AuthComponent } from './auth/auth.component';
import { CreateLunchPlanSuccessComponent } from './lunch-plan/create-lunch-plan-success/create-lunch-plan-success.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'session',
    children: [
      {
        path: 'create',
        component: CreateLunchPlanComponent,
      },
      {
        path: 'create-success',
        component: CreateLunchPlanSuccessComponent,
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

  {
    path: 'not-found',
    component: ErrorComponent,
    data: { message: 'Page not found' },
  },
  // { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
