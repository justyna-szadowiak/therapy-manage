import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, Observable, take, lastValueFrom  } from 'rxjs';
import { Patient, Therapy, Therapist, Plan } from '.././interfaces';
import { TherapyManagerBackendService } from '../therapy-manager-backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@UntilDestroy()
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
  monthPlan$: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([]);
  dataByMonth$: Observable<any> | undefined;
  days = new FormControl();
  dayList: number[] = [];
  selectedDayPlan$: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([]);


  constructor(private endpoints: TherapyManagerBackendService, private dialog: MatDialog) {
    this.patients$ = this.endpoints.getAllPatients();
    this.therapies$ = this.endpoints.getAllTherapies();
    this.therapists$ = this.endpoints.getAllTherapists();
    this.planners$ = this.endpoints.getAllPlanners();
  }


  onMonthSelected(event: Date) {
    this.endpoints.getPlanForAdminByMonth(event.getMonth().toString()).pipe(
      take(1)
    ).subscribe(data => {
      this.monthPlan$.next(data);
    })
  }

  ngOnInit(): void {
    this.dataByMonth$ = this.endpoints.getAllPlanners();
    this.dataByMonth$ = this.endpoints.getPlanForAdminByMonth('3');

    this.dataByMonth$.pipe(
      untilDestroyed(this),
      filter((obj) => {
        return obj.therapist === "dr Elżbieta Nowak"
      }),
      map((obj) => {
        return {
          therapist: obj.therapist,
          date: obj.data
        }
      })
    ).subscribe((data) => {
      console.log(data)
    })
  }

  onSelectedChange(event: Date) {
    this.monthPlan$.pipe(
      take(1),
      map((plans: Plan[]) => {
        return plans.filter((plan: Plan) => {
          let planDate = new Date(plan.date_time);
          let planDateToString = `${planDate.getDay()}/${planDate.getMonth()}/${planDate.getUTCFullYear()}`;
          let eventDateInString = `${event.getDay()}/${event.getMonth()}/${event.getUTCFullYear()}`;
          return planDateToString === eventDateInString;
        })
      })
    ).subscribe((plans: Plan[]) => {
      this.selectedDayPlan$.next(plans)
    })
  }

  async onClickedAdd(){
    const therapists = await lastValueFrom(this.therapists$);
    const therapies = await lastValueFrom(this.therapies$);
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '400px',
      data: { therapists, therapies }
    });
  }
}
