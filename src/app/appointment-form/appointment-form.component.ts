import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Therapist, Therapy } from '../interfaces';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  therapists: Therapist[] = [];

  therapies: Therapy[] = [];

  name: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {therapists: Therapist[], therapies: Therapy[] },
  ) {
    this.therapists = this.data.therapists;
    this.therapies = this.data.therapies;
  }

  ngOnInit(): void {

  }
}
