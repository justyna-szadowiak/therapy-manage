import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PlanForTherapist } from '.././interfaces';
import { TherapyManagerBackendService } from '../therapy-manager-backend.service';

@Component({
  selector: 'app-therapist-plan',
  templateUrl: './therapist-plan.component.html',
  styleUrls: ['./therapist-plan.component.scss'],
})
export class TherapistPlanComponent implements OnInit {
  public dataSource: PlanForTherapist[] = [];
  patients$: Observable<Patient[]>;
  plannerForTherapist$: Observable<PlanForTherapist[]>;

  constructor(public endpoints: TherapyManagerBackendService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.plannerForTherapist$ = this.endpoints.getAllPlanForTherapist();
  }

  public displayedColumns: PlanForTherapist[] = [
    'patient_name',
    'kind_of_therapy',
    'date_time',
  ];

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.endpoints.getAllPlanForTherapist();
  }
}
