import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './guards/auth-guard';
import { AdminComponent } from './components/admin-component/admin-component';
import { AgentAffectationComponent } from './components/agent-affectation/agent-affectation';
import { ReleveComponent } from './components/releve/releve';
import { CompteurComponent } from './components/admin-backoffice/admin-back-compteur/admin-back-compteur'; 
import { SidebarComponent } from './shared/sidebar-component/sidebar-component';

export const routes: Routes = [

  { 
    path: 'admin-backoffice/compteur', 
    component: CompteurComponent 
  },
  {
    path: 'agent-affectation',
    component:AgentAffectationComponent,
  },
 {
  path: 'admin/dashboard',
  component: AdminComponent,
 },

 {
  path: 'releve',
  component: ReleveComponent,
 },

  { 
    path: 'sidebar', 
    component: SidebarComponent  
  },

  { 
    path: 'login', 
    component: LoginComponent 
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