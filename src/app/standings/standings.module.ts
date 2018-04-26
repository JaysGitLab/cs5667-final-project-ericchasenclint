import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { StandingsRoutes } from "./standings.routes";
import { StandingsComponent } from "./standings.component";

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
        RouterModule.forChild(StandingsRoutes)
    ],
    exports: [StandingsComponent],
    declarations: [StandingsComponent]
})
export class StandingsModule { }
