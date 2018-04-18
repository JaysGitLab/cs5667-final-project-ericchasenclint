import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SigninComponent } from './signin';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';

import { ReactComponent } from './react';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'signin',  component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'react', component: ReactComponent },
  
  { path: '**',    component: NoContentComponent },
];
