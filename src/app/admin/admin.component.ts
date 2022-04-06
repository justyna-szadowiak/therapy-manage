import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, Therapy, Therapist, Plan } from '.././interfaces';
import { TherapyManagerBackendService } from '../therapy-manager-backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  // selected$: Observable<Date[]>;
  patients$: Observable<Patient[]>;
  therapies$: Observable<Therapy[]>;
  therapists$: Observable<Therapist[]>;
  planners$: Observable<Plan[]>;

  constructor(private endpoints: TherapyManagerBackendService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.therapies$ = this.endpoints.getAllTherapies();
    this.therapists$ = this.endpoints.getAllTherapists();
    this.planners$ = this.endpoints.getAllPlanners();

    // this.selected$ = this.planners$.pipe(
    //   map((planner: Plan[]) =>
    //     planner.map((plan: Plan) => new Date(plan.date_time))
    //   )
    // );
  }

  ngOnInit(): void {}

  // onDateSelected(event: any) {
  //   console.log(event);
  // }

  // isSelected = (event: any) => {
  //   const date =
  //     event.getFullYear() +
  //     '-' +
  //     ('00' + (event.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('00' + event.getDate()).slice(-2);
  //   return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  // };
}
