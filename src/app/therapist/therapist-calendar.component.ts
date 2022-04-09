import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {ApiService} from "../api.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {PlanForTherapist} from "../interfaces";

@UntilDestroy()
@Component({
  selector: 'app-therapist',
  templateUrl: './therapist-calendar.component.html',
  styleUrls: ['./therapist-calendar.component.scss']
})
export class TherapistCalendarComponent implements OnInit {
  selected: Date | null = null;
  monthPlan$: BehaviorSubject<PlanForTherapist[]> = new BehaviorSubject<PlanForTherapist[]>([]);
  days = new FormControl();
  dayList: number[] = [];
  dataByMonth$: Observable<any> | undefined;
  selectedDayPlan$: BehaviorSubject<PlanForTherapist[]> = new BehaviorSubject<PlanForTherapist[]>([]);

  constructor(
    public endpoints: ApiService
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
    this.dataByMonth$ = this.endpoints.getPlanForTherapistByMonth('3');

    this.onMonthSelected(new Date());
    this.onSelectedChange(new Date());
  }

  onSelectedChange(event: Date) {
    this.monthPlan$.pipe(
      map((plans: PlanForTherapist[]) => {
        return plans.filter((plan: PlanForTherapist) => {
          let planDate = new Date(plan.date_time);
          let planDateString = `${planDate.getDay()}/${planDate.getMonth()}/${planDate.getUTCFullYear()}`
          let eventDateString = `${event.getDay()}/${event.getMonth()}/${event.getUTCFullYear()}`
          return planDateString === eventDateString;
        })
      })
    ).subscribe((plans: PlanForTherapist[]) => {
      this.selectedDayPlan$.next(plans)
    })
  }
}

