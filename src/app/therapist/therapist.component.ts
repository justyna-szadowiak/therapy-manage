import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, filter, map, Observable, take } from "rxjs";
import { TherapyManagerBackendService } from "../therapy-manager-backend.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlanForTherapist } from "../interfaces";

@UntilDestroy()
@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {
  selected: Date | null = null;
  monthPlan$: BehaviorSubject<PlanForTherapist[]> = new BehaviorSubject<PlanForTherapist[]>([]);
  days = new FormControl();
  dayList: number[] = [];
  dataByMonth$: Observable<any> | undefined;
  selectedDayPlan$: BehaviorSubject<PlanForTherapist[]> = new BehaviorSubject<PlanForTherapist[]>([]);

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
    this.dataByMonth$ = this.endpoints.getAllPlanForTherapist();
    this.dataByMonth$ =  this.endpoints.getPlanForTherapistByMonth('3');

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
      console.log(data);
    })
  }

  onSelectedChange(event: Date) {
    this.monthPlan$.pipe(
      take(1),
      map((plans: PlanForTherapist[]) => {
        return plans.filter((plan: PlanForTherapist) => {
          let planDate = new Date(plan.date_time);
          let planDateString = `${planDate.getDay()}/${planDate.getMonth()}/${planDate.getUTCFullYear()}`
          let eventDateString = `${event.getDay()}/${event.getMonth()}/${event.getUTCFullYear()}`
          console.log(planDateString, eventDateString);
          return planDateString === eventDateString;
        })
      })
    ).subscribe((plans: PlanForTherapist[]) => {
      this.selectedDayPlan$.next(plans)
    })
  }
}

