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
  MatMenuModule,
  MatIconModule,
  MatIconRegistry,
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
    MatMenuModule,
    MatIconModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  providers: [
    MatIconRegistry
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent]
})
export class NavBarModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
