import {Login} from "../interfaces";
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Login = JSON.parse(localStorage.getItem('user')) || {
    email: '',
    password: ''
  };

  constructor(private router: Router) {
  }

  public logOut(): void {
    if (confirm('Are you sure you want to exit?')) {
      this.user = {
        email: '',
        password: ''
      }
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }

}
