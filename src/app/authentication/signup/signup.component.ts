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
    show: boolean;
    newUser: any = {};
    
    constructor (private _authenticationService:
        AuthenticationService,
        private _router: Router) {}


    signup() {
        this.validateFields();
        if (this.show) {
            return
        }
        
        this._authenticationService.signup(this.newUser)
        .subscribe(result => this._router.navigate(['/']),
        error => this.errorMessage = error);
        
        this.show = true;
    }
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    validateFields() {
        if(this.newUser.fullName == undefined || this.newUser.username == undefined || this.newUser.password == undefined) {
            this.errorMessage = "Please fill in the missing fields.";
            this.show = true;
            return
        }
        
        if(!this.validateEmail(this.newUser.username)){
            this.errorMessage = "Invalid email, please make sure it's an email.";
            this.show = true;
            return
        }
        
        let pass = this.newUser.password.trim();
        if(pass == "" || pass == undefined){
            this.errorMessage = "Please provide a password.";
            this.show = true;
            return
        }   
    }
}
