import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from 
'../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',  // <signin></signin>
  styleUrls: [ './signin.component.scss' ],
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
