import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TherapyManagerBackendService {
  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/patients');
  }

  getAllTherapies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/therapies');
  }

  getAllTherapists(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/therapists');
  }

  getAllPlanners(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/calendar');
  }

  getAllPlanForTherapist(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/plannerForTherapist');
  }

  getPlanForTherapistByMonth(month: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/calendar/${month}`)
  }

  getAllRole(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/roles');
  }
}
