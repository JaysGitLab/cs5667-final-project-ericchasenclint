import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { TeamComponent } from "./team-select/team.component"
import { NoContentComponent } from "./no-content";

import { DataResolver } from "./app.resolver";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "select", component: TeamComponent },
  { path: "**", component: NoContentComponent }
];

