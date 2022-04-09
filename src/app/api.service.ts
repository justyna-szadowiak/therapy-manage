import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';
import {environment} from "../environments/environment";
import {JwtPayload, Patient, Plan, PlanForTherapist, Therapist, Therapy, User} from "./interfaces";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userCookieKey = `${environment.cookieKey}user`;
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private readonly cookieService: CookieService) {
  }

  getAllPatients(): Observable<Patient[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`, {headers});
  }

  getAllTherapies(): Observable<Therapy[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<Therapy[]>(`${this.apiUrl}/therapies`, {headers});
  }

  getAllTherapists(): Observable<Therapist[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<Therapist[]>(`${this.apiUrl}/therapists`, {headers});
  }

  getAllPlanners(): Observable<Plan[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<Plan[]>(`${this.apiUrl}/calendar`, {headers});
  }

  getAllPlanForTherapist(): Observable<PlanForTherapist[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<PlanForTherapist[]>(`${this.apiUrl}/plannerForTherapist`, {headers});
  }

  getPlanForTherapistByMonth(month: string): Observable<PlanForTherapist[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<PlanForTherapist[]>(`${this.apiUrl}/plannerForTherapist/${month}`, {headers});
  }

  getPlanForAdminByMonth(month: string): Observable<Plan[]> {
    let headers = new HttpHeaders();
    if (this.userToken) {
      headers = headers.set('Authorization', `Bearer ${this.userToken}`);
    }
    return this.http.get<Plan[]>(`${this.apiUrl}/calendar/${month}`, {headers});
  }

  public get userToken() {
    return this.cookieService.get(this.userCookieKey);
  }

  public set userToken(token: string) {
    this.cookieService.set(this.userCookieKey, token);
  }

  public get isTokenExpired(): boolean {
    return jwt_decode<JwtPayload<User>>(this.userToken).exp === Math.floor(Date.now() / 1000);
  }

  public async logIn(email: string, password: string): Promise<boolean> {
    const body = {email, password};
    const jwtToken = (await lastValueFrom(this.http.post<{ jwt_token: string }>(`${this.apiUrl}/auth/login`, body))).jwt_token;
    this.userToken = jwtToken;
    const {iat, exp, ...user} = jwt_decode<JwtPayload<User>>(jwtToken);
    return user.is_admin;
  }

  public logOut() {
    this.cookieService.delete(this.userCookieKey);
  }
}
