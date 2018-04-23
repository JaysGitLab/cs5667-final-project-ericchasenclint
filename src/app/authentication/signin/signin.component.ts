import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'signin',  // <signin></signin>
  styleUrls: [ './signin.component.scss' ],
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  errorMessage: string;
  show: boolean;
  credentials: any = {};

  constructor (private _authenticationService: AuthenticationService, private _router: Router) {
  }

  signin() {
    if(!this.validateEmail(this.credentials.username)){
        this.errorMessage = "Invalid email, please make sure it's an email.";
        this.show = true;
        return
    }
      
    this._authenticationService.signin(this.credentials).subscribe(result  => this._router.navigate(['/']), 
                                                                   error =>  this.errorMessage = error );
    this.show = true;
  }
  
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
