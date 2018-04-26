import { Component, OnInit, Input } from '@angular/core';
import { Bracket } from '../bracket';
@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  @Input() bracket;
  @Input() displayUntil;
  @Input() top;

  constructor() { 
  }

  ngOnInit() {

  }

  onSelect(name: string){
      this.bracket.up.setName(name);
  }
}
