import { Routes } from '@angular/router';
import { AdminComponent } from './Components/admin-component/admin-component';
import { SidebarComponent } from './shared/sidebar-component/sidebar-component';


export const routes: Routes = [

    { 
    path: 'admin', 
    component: AdminComponent  // Route définie
  },
    { 
    path: 'sidebar', 
    component: SidebarComponent  // Route définie
  }
];
