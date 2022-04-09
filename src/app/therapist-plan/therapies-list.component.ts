import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient, PlanForTherapist} from '.././interfaces';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-therapist-plan',
  templateUrl: './therapies-list.component.html',
  styleUrls: ['./therapies-list.component.scss'],
})
export class TherapiesListComponent {
  patients$: Observable<Patient[]>;
  plannerForTherapist$: Observable<PlanForTherapist[]>;
  getAllPlanForTherapist: any;

  constructor(public endpoints: ApiService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.plannerForTherapist$ = this.endpoints.getAllPlanForTherapist();
  }

  public displayedColumns: string[] = [
    'therapist',
    'patient_name',
    'kind_of_therapy',
    'date_time',
  ];
  public dataSource: PlanForTherapist[] = [];
}
