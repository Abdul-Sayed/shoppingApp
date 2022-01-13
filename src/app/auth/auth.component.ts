import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = '';
  authResponse: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authResponse = this.authService.signIn(
        form.value.email,
        form.value.password
      );
    } else {
      this.authResponse = this.authService.signUp(
        form.value.email,
        form.value.password
      );
    }
    this.authResponse.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      },
      complete: () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
    });
    form.reset();
  }
}
