import {Router} from "@angular/router";
import {AuthService} from "../common/services";
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loader = false;
  public checkEye = false;
  public loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loginCheck();
  }

  private loginCheck() {
    if (this.authService.user.email) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  public onSubmit(): any {
    if (this.loginForm.valid) {
      this.loader = true;

      this.sendData()
        .then(() => {
          this.authService.user = this.loginForm.value;

          localStorage.setItem('user', JSON.stringify(this.authService.user));

          this.router.navigate(['dashboard']);

        })
        .finally(() => this.loader = false);
    }
  }

  public sendData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('success'), 3000);
    });
  }

  public onSelectEye(): void {
    this.checkEye = !this.checkEye;
  }

}
