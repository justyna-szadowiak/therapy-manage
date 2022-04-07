import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject, filter, map, Observable, Subject, take, takeUntil } from "rxjs";
import { TherapyManagerBackendService } from "../therapy-manager-backend.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Plan } from "../interfaces";

@UntilDestroy()
@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {
  selected: Date | null = null;
  monthPlan$: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([])
  days = new FormControl();
  dayList: number[] = [];
  dataByMonth$: Observable<any> | undefined;
  selectedDayPlan$: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([])

  constructor(
    public endpoints: TherapyManagerBackendService
  ) { }

  onMonthSelected(event: Date) {
    this.endpoints.getPlanForTherapistByMonth(event.getMonth().toString()).pipe(
      take(1)
    ).subscribe(data => {
      this.monthPlan$.next(data);
    })
  }

  ngOnInit(): void {
    this.dataByMonth$ = this.endpoints.getAllPlanners();
    this.dataByMonth$ =  this.endpoints.getPlanForTherapistByMonth('3');

    this.dataByMonth$.pipe(
      untilDestroyed(this),
      filter((obj) => {
        return obj.therapist === "dr Elżbieta Nowak"
      }),
      map((obj) => {
        return {
          therapis: obj.therapis,
          date: obj.data
        }
      })
    ).subscribe((data) => {
      console.log(data);
    })
  }

  onSelectedChange(event: Date) {
    this.monthPlan$.pipe(
      take(1),
      map((plans: Plan[]) => {
        return plans.filter((plan: Plan) => {
          let planDate = new Date(plan.date_time);
          let planDateString = `${planDate.getDay()}/${planDate.getMonth()}/${planDate.getUTCFullYear()}`
          let eventDateString = `${event.getDay()}/${event.getMonth()}/${event.getUTCFullYear()}`
          console.log(planDateString, eventDateString);
          return planDateString === eventDateString;
        })
      })
    ).subscribe((plans: Plan[]) => {
      this.selectedDayPlan$.next(plans)
    })
  }
}

