import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'signin',  // <signin></signin>
  styleUrls: ['./signin.component.scss'],
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  errorMessage: string;
  show: boolean;
  credentials: any = {};
  user: any;

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  }

  signin() {
    this._authenticationService.signin(this.credentials).subscribe(result => this._router.navigate(['/']),
      error => this.errorMessage = error);
    this.show = true;
  }
}
