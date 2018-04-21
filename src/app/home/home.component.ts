import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})


export class HomeComponent {
    user: any;

    constructor (private _authenticationService: AuthenticationService){
        this.user = _authenticationService.user;
    }
}