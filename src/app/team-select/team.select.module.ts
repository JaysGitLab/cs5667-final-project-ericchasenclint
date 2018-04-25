import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { TeamSelectComponent } from "./team.select.component";
import { TeamComponent } from './team/team.component';

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
        MatExpansionModule
    ],
    exports: [TeamSelectComponent],
    declarations: [TeamSelectComponent, TeamComponent]
})
export class TeamSelectModule { }
