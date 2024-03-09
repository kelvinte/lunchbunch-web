import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { SessionDetailComponent } from './session/session-detail/session-detail.component';
import { CreateSessionComponent } from './session/create-session/create-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { AuthComponent } from './auth/auth.component';

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
        component: CreateSessionComponent,
      },
      {
        path: 'join',
        component: JoinSessionComponent,
      },
      {
        path: ':uuid',
        component: SessionDetailComponent,
      },
    ],
  },

  {
    path: 'not-found',
    component: ErrorComponent,
    data: { message: 'Page not found' },
  },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
