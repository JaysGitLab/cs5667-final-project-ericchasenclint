import { Component, OnInit, Input } from "@angular/core";
import { bracket } from "./data/data";

@Component({
  selector: "team", // <team></team>
  styleUrls: ["./team.component.scss"],
  templateUrl: "./team.component.html"
})
export class TeamComponent {
  bracket = bracket;

  @Input() selection = [];

  constructor() {}
  ngOnInit() {}

  recordTeam = (team, index) => {
    this.selection[index] = team;
  };
}
