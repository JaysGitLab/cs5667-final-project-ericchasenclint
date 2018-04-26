import { Component, OnInit } from "@angular/core";

@Component({
  selector: "team-select", // <team-select></team-select>,
  styleUrls: ["./team.select.component.scss"],
  template: '<div class="select-team-container"><router-outlet></router-outlet></div>'
})
export class TeamSelectComponent { }
