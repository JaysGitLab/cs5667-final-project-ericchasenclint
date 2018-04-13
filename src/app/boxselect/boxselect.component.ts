import { Component, OnInit, Input } from '@angular/core';
import { Bracket } from '../bracket';

@Component({
  selector: 'app-boxselect',
  templateUrl: './boxselect.component.html',
  styleUrls: ['./boxselect.component.css']
})
export class BoxselectComponent implements OnInit {
  @Input() bracket;

  constructor() { }

  ngOnInit() {
  }

  onSelect(bracket: Bracket){
      bracket.up.name = bracket.name;
  }
}
