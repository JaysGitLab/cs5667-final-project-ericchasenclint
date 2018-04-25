import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomeRoutes } from "./home.routes";
import { HomeComponent } from "./home.component";

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
        RouterModule.forChild(HomeRoutes)
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent]
})
export class HomeModule { }
