import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(r => r.auth_routes)
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'setting',
        loadChildren: () =>
            import('./features/users/users.routes').then(r => r.user_routes)
    },
];