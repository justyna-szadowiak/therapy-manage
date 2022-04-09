import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly apiService: ApiService, private readonly router: Router) {}

  public canActivate(): boolean | UrlTree {
    if (this.apiService.userToken && !this.apiService.isTokenExpired) {
      return true;
    }

    return this.router.createUrlTree(['/log-in']);
  }
}
