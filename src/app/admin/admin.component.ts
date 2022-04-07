import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, Therapy, Therapist, Plan } from '.././interfaces';
import { TherapyManagerBackendService } from '../therapy-manager-backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  selected: Date | null | undefined;
  patients$: Observable<Patient[]>;
  therapies$: Observable<Therapy[]>;
  therapists$: Observable<Therapist[]>;
  planners$: Observable<Plan[]>;

  constructor(private endpoints: TherapyManagerBackendService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.therapies$ = this.endpoints.getAllTherapies();
    this.therapists$ = this.endpoints.getAllTherapists();
    this.planners$ = this.endpoints.getAllPlanners();
  }

  ngOnInit(): void {}
}
