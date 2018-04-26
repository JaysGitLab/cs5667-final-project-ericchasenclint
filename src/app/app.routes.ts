import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { ReactComponent } from "./react";
import { NoContentComponent } from "./no-content";
import { TeamSelectComponent } from "./team-select";

import { DataResolver } from "./app.resolver";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "react", component: ReactComponent },
  { path: "**", component: NoContentComponent }
];
