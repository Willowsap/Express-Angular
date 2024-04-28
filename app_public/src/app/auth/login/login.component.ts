import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import AuthService from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.getLoggedInListener().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/']);
        }
      }
    )
  }

  login(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }
}
