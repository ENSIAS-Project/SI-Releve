// src/app/app-routing.module.ts (ou app.routes.ts pour standalone)
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './guards/auth-guard';
import { AdminComponent } from './Components/admin-component/admin-component';
import { SidebarComponent } from './shared/sidebar-component/sidebar-component';


export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
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