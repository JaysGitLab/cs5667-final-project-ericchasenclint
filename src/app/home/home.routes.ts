import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { TeamComponent } from '../team-select/team.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'select',
        component: TeamComponent
    },
];
