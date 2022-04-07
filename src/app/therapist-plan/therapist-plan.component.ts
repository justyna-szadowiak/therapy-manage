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
  patients$: Observable<Patient[]>;
  plannerForTherapist$: Observable<PlanForTherapist[]>;
  getAllPlanForTherapist: any;

  constructor(public endpoints: TherapyManagerBackendService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.plannerForTherapist$ = this.endpoints.getAllPlanForTherapist();
  }

  public displayedColumns: string[] = [
    'patient_name',
    'kind_of_therapy',
    'date_time',
  ];
  public dataSource: PlanForTherapist[] = [];

  async ngOnInit(): Promise<void> {
    // this.dataSource = await this.getAllPlanForTherapist();
  }
}
