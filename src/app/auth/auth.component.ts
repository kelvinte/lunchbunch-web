import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = false;
  error = null;
  successMessage = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.successMessage = null;
  }

  onSubmit() {
    let authObs: Observable<any>;

    if (this.isLoginMode) {
      authObs = this.authService.login(
        this.authForm.value.email,
        this.authForm.value.password,
      );
    } else {
      authObs = this.authService.register(
        this.authForm.value.email,
        this.authForm.value.password,
        this.authForm.value.name,
      );
    }

    authObs.subscribe({
      next: (userResponse) => {
        console.log(userResponse);
        if (this.isLoginMode) {
          this.router.navigate(['/']);
        } else {
          this.successMessage =
            'You have successfully registered, please proceed to login';
          this.isLoginMode = true;
          this.error = null;
          this.authForm.resetForm();
        }
      },
      error: (err) => {
        console.log(err);
        this.error = err;
      },
    });
  }
}
