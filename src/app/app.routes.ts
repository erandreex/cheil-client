import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './utils/auth.guard';
import { adminGuard } from './utils/admin.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [authGuard],
            },
            {
                path: 'admin',
                component: AdminViewComponent,
                canActivate: [authGuard, adminGuard],
            },
            {
                path: 'profile/:id',
                component: UserProfileComponent,
                canActivate: [authGuard],
            },
            {
                path: 'profile',
                component: UserProfileComponent,
                canActivate: [authGuard],
            },
            {
                path: 'documentation',
                component: DocumentationComponent,
                canActivate: [authGuard],
            },
        ],
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
