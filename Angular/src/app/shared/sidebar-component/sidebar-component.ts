import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {
  @Input() menuItems: MenuItem[] = []; // Reçoit les items du parent
  @Input() userRole: string = 'Admin Backoffice'; // Optionnel: pour l'affichage
  
  constructor(private router: Router) {}

  getRoleDisplay(): string {
    return this.userRole;
  }

  logout(): void {
    // Logique de déconnexion existante
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}