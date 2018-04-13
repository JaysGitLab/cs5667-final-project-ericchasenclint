import { Component, OnInit, Input } from '@angular/core';
import { Bracket } from '../bracket';
@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  @Input() bracket;

  constructor() { 
      if (this.bracket == null){
        console.log("bracket is null in constr")
      }else{
        console.log("bracket is not null in constr")
      }
  }

  ngOnInit() {

  }

  onSelect(name: string){
      this.bracket.up.name = name;
  }
}
