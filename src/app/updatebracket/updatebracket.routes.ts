import { Routes } from '@angular/router';

import { UpdateBracketComponent } from './updatebracket.component';
import { ContestSelectComponent } from '../contestselect/contestselect.component';

export const UpdateBracketRoutes: Routes = [{
    path: 'updatebracket',
    children: [
        {path: '', component: ContestSelectComponent, data:{msg: "Update brackets for which contest?"}},
        {path: ':year/:gender', component: UpdateBracketComponent},
    ]
}];

