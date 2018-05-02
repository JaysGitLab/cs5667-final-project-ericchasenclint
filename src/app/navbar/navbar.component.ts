import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: "navbar",
  styleUrls: ['./navbar.component.scss'],
  templateUrl: "./navbar.component.html"
})
export class NavBarComponent { 
  @LocalStorage('user') user: any;
}
