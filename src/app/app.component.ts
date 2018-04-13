import { Component } from '@angular/core';
import { Bracket } from './bracket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McRae Maddness';
  bracket = new Bracket(null, "", 0);
}

