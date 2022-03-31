import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TherapyManagerBackendService } from '../therapy-manager-backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  selected: Date | null = null;
  patients$: Observable<any[]>;
  therapies$: Observable<any[]>;
  therapists$: Observable<any[]>;

  constructor(private endpoints: TherapyManagerBackendService) {
    this.patients$ = this.endpoints.getAllPatients();
    this.therapies$ = this.endpoints.getAllTherapies();
    this.therapists$ = this.endpoints.getAllTherapists();
  }

  ngOnInit(): void {}
}
