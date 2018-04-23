import { Component, OnInit } from "@angular/core";

@Component({
  selector: "team-select", // <team-select></team-select>,
  styleUrls: ["./team.select.component.scss"],
  templateUrl: "./team.select.component.html"
})
export class TeamSelectComponent {
  teams = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  emptyIndexes = [];

  addTeams(evt: Array<string>): void {
    for (let i = 0; i < evt.length; i++) {
      this.teams[i] = evt[i];
    }
  }

  submitSelection = () => {
    this.emptyIndexes = [];

    // Validate if all teams have been selected and there are no seeds not selected
    if (this.teams.length === 16 && !this.teamsHaveEmpty()) {
      console.log("All teams are in!");
    }
  };

  teamsHaveEmpty = () => {
    for (let i = 0; i < this.teams.length; i++) {
      if (!this.teams[i]) this.emptyIndexes.push(i);
    }

    return this.emptyIndexes.length ? true : false;
  };
}
