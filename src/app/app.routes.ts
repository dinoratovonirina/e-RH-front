import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(r => r.auth_routes)
    }
];