import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Nettoyer les données de session/token si nécessaire
    // localStorage.removeItem('token');
    // sessionStorage.clear();
    
    console.log('Déconnexion en cours...');
    
    // Naviguer vers la page de login
    this.router.navigate(['/login']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/admin']);
  }
}