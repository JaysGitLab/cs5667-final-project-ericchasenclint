import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { TeamSelectComponent } from '../team-select/team.select.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'select',
        component: TeamSelectComponent
    },
];
