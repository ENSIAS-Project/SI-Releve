import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './guards/auth-guard';
import { AdminComponent } from './components/admin-component/admin-component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
 {
  path: 'admin/dashboard',
  component: AdminComponent,
 },
//   { 
//     path: 'admin/dashboard', 
//     canActivate: [AuthGuard],
//     data: { role: 'ROLE_SUPERADMIN' },
//     loadComponent: () => import('./components/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
//   },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];