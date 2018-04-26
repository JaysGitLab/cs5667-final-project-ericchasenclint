import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { NoContentComponent } from "./no-content";
import { TeamSelectComponent } from "./team-select";
import { StandingsComponent } from './standings';

import { DataResolver } from "./app.resolver";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "select", component: TeamSelectComponent },
  { path: "**", component: NoContentComponent }
];
