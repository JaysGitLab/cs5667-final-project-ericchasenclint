import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { LocalStorage } from 'ngx-store';


@Component({
  selector: 'signup',
  styleUrls: [ './signup.component.scss' ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
    @LocalStorage('user') user: any;
    errorMessage: string;
    newUser: any = {};
    
    constructor (private _authenticationService:
        AuthenticationService,
        private _router: Router) {}


    signup() {
        this._authenticationService.signup(this.newUser)
        .subscribe(result => this._router.navigate(['/']),
        error => this.errorMessage = error);
    }
}
