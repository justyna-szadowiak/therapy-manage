import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TherapyManagerBackendService {
  tst$: Observable<string>;

  constructor(private http: HttpClient) {
    this.tst$ = this.http.get('http://localhost:3000/', {responseType: 'text'});
    this.tst$.subscribe(tst => {console.log(tst);
    })
  }
}
