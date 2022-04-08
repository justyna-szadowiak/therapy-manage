import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  // public isSignInDisabled$: Observable<boolean>;

  constructor() { }

    public ngOnInit(): void {
      // this.isSignInDisabled$ = combineLatest([this.loginControl.valueChanges, this.passwordControl.valueChanges]).pipe(
      //   map(([login, password]: [string, string]) => !(login && password)),
      //   startWith(true)
      // );
    }

  public get loginControl(): FormControl {
    return this.loginForm.get('login') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public logIn(): void {
    const login = this.loginControl.value;
    const passwordMD5 = btoa(this.passwordControl.value);
    // this.
  }
}


