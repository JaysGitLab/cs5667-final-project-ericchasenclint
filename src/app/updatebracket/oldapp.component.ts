import { Component } from '@angular/core';
import { Bracket } from './bracket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McRae Maddness';
  teamNames = ['a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n','o',
    'p','q','r','s','t'];
  bracket = new Bracket(null, this.teamNames, 1);
}

