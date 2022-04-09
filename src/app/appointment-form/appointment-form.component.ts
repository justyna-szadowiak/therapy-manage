import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Therapist, Therapy} from '../interfaces';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  therapists: Therapist[] = [];
  therapies: Therapy[] = [];
  name: string | undefined;

  public appointmentForm = new FormGroup({
    patientName: new FormControl(''),
    therapistName: new FormControl(''),
    therapy: new FormControl(''),
    date: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {therapists: Therapist[], therapies: Therapy[] },
  ) {
    this.therapists = this.data.therapists;
    this.therapies = this.data.therapies;
  }

  public submit() {
    this.dialogRef.close();
  }
}
