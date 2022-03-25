import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ParentComponent } from './parent/parent.component';
import { TherapistComponent } from './therapist/therapist.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'therapist', component: TherapistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
