import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  public isErrorShowing: boolean = false;

  public loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private apiService: ApiService, private router: Router) { }

  public get loginControl(): FormControl {
    return this.loginForm.get('login') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public async logIn(): Promise<void> {
    try {
      this.isErrorShowing = false;
      const login = this.loginControl.value;
      const passwordMD5 = btoa(this.passwordControl.value);
      const isUserAdmin = await this.apiService.logIn(login, passwordMD5);
      this.router.navigateByUrl(isUserAdmin ? 'admin' : 'therapist');
    } catch (e: HttpErrorResponse | any) {
      this.isErrorShowing = e.status === 401;
    }
  }
}
