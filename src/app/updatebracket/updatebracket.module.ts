import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

import { UpdateBracketRoutes } from './updatebracket.routes';
import { UpdateBracketComponent} from './updatebracket.component';
import { BracketComponent } from './bracket/bracket.component';


import {
  MatButtonModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule.forChild(UpdateBracketRoutes),
    ],
    declarations: [
        UpdateBracketComponent,
        BracketComponent
    ]
})

export class UpdateBracketModule{ }
