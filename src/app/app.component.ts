import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './interfaces';
import { TherapyManagerBackendService } from './therapy-manager-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  role$: Observable<Role[]>;

  constructor(private endpoints: TherapyManagerBackendService) {
    this.role$ = this.endpoints.getAllRole();
  }

  ngOnInit(): void {}
}
