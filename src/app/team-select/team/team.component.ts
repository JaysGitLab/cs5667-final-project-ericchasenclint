import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { bracket } from "./data/data";

@Component({
  selector: "team", // <team></team>
  styleUrls: ["./team.component.scss"],
  templateUrl: "./team.component.html"
})
export class TeamComponent {
  bracket = bracket;

  selectedTeam: string;
  selection = [];

  @Output() sendSelections = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  addTeamAndSend(team, index) {
    this.selection[index] = team;
    this.sendSelections.emit(this.selection);
  }

  showSelectedTeam(team) {
    let t = this.selection.find(t => {
      return t === team;
    });
    return t;
  }
}
