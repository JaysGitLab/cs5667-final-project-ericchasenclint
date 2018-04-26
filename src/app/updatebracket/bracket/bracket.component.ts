import { Component, OnInit, Input } from '@angular/core';
import { Bracket, Team } from '../bracket';
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

  onSelect(team: Team){
      this.bracket.up.setTeam(team);
  }

  clear(){
      this.bracket.setTeam(Team.nullTeam);
  }
}
