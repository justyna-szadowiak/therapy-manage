import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { TherapistPlanComponent } from './therapist-plan/therapist-plan.component';
import { TherapistComponent } from './therapist/therapist.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'therapist', component: TherapistComponent },
  { path: 'therapist-plan', component: TherapistPlanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
