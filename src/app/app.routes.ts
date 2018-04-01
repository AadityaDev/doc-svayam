import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        component: DashboardComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);