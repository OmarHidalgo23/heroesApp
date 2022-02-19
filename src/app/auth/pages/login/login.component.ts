import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private route: Router, private authService: AuthService) { }

  login() {
    this.authService.login().subscribe(auth => {
      if (auth.id) {
        this.route.navigate(['./heroes']);
      }
    })
  }

  sinlogin() {
    this.route.navigate(['./heroes']);
  }
}
