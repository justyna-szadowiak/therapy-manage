import { Injectable } from '@angular/core';
import {JwtPayload, User} from "./interfaces";
import {ApiService} from "./api.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get user(): User {
    return jwt_decode<JwtPayload<User>>(this.apiService.userToken);
  }

  isAdmin(): boolean {
    return jwt_decode<JwtPayload<User>>(this.apiService.userToken).is_admin;
  }

  constructor(private apiService: ApiService) { }
}
