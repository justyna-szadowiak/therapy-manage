import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {
  selected: Date | null = null;

  days = new FormControl();
  dayList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor() { }

  ngOnInit(): void {  }
}

