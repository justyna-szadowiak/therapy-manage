import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminCalendarComponent} from './admin/admin-calendar.component';
import {TherapiesListComponent} from './therapist-plan/therapies-list.component';
import {TherapistCalendarComponent} from './therapist/therapist-calendar.component';
import {LogInComponent} from "./log-in/log-in.component";
import {AuthGuard} from "./auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AdminGuard} from "./admin.guard";

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: 'admin', canActivate: [AdminGuard], children: [
          {path: '', redirectTo: 'calendar', pathMatch: 'full'},
          {path: 'calendar', component: AdminCalendarComponent},
        ]},
      {
        path: 'therapist', canActivate: [AuthGuard], children: [
          {path: '', redirectTo: 'calendar', pathMatch: 'full'},
          {path: 'calendar', component: TherapistCalendarComponent},
          {path: 'therapies', component: TherapiesListComponent},
        ]
      },
    ]
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
