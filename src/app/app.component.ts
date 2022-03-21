import { Component } from '@angular/core';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'therapy-manager';
  role: Role[] = [
    {value: 'admin-0', viewValue: 'Admin'},
    {value: 'therapist-1', viewValue: 'Therapist'},
  ];
}
