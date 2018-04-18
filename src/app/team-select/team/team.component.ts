import { Component, NgModule, OnInit } from "@angular/core";
import { bracket } from "./data/data";

@Component({
  selector: "team", // <team></team>
  styleUrls: ["./team.component.scss"],
  templateUrl: "./team.component.html"
})
export class TeamComponent {
  bracket = bracket;

  recordTeam = team => {
    console.log(team);
  };

  constructor() {}
  ngOnInit() {}
}
