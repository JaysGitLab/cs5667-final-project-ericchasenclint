import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import { LocalStorage } from 'ngx-store';


@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})


export class HomeComponent {
    @LocalStorage('user') user: any;
    //user: any;

    constructor (private _authenticationService: AuthenticationService){
        this.user = _authenticationService.user;
    }

    signout(){
        localStorage.clear();
        window.location.replace("/api/auth/signout");
    }
}
