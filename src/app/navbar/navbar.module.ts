import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthenticationRoutes } from "../authentication/authentication.routes";
import { NavBarComponent } from "./navbar.component";

import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent]
})
export class NavBarModule {}
