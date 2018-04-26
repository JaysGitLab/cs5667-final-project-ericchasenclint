import { Routes } from '@angular/router';

import { UpdateBracketComponent } from './updatebracket.component';
import { ContestSelectComponent } from '../contestselect/contestselect.component';

export const UpdateBracketRoutes: Routes = [{
    path: 'updatebracket',
    children: [
        {path: '', component: ContestSelectComponent},
        {path: ':year/:gender', component: UpdateBracketComponent},
    ]
}];

