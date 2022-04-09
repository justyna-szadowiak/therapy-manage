import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {User} from "../interfaces";
import {UserService} from "../user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public user: User | undefined;

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logOut() {
    this.apiService.logOut();
    this.router.navigate(['./log-in']);
  }
}
