import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[]; // Rôles autorisés
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  
  userRole: string = '';
  filteredMenuItems: MenuItem[] = [];
  sidebarOpen: boolean = true;
  showSidebar: boolean = false;
  isSuperAdmin: boolean = false;

  // Tous les menus disponibles
  allMenuItems: MenuItem[] = [
    // Menus UTILISATEUR UNIQUEMENT
    {
      label: 'Compteurs',
      icon: 'gauge',
      route: '/compteur',
      roles: ['UTILISATEUR', 'ROLE_UTILISATEUR']
    },
    {
      label: 'Relevés',
      icon: 'clipboard',
      route: '/releve',
      roles: ['UTILISATEUR', 'ROLE_UTILISATEUR']
    },
    {
      label: 'Affectation Quartier',
      icon: 'map',
      route: '/agent-affectation',
      roles: ['UTILISATEUR', 'ROLE_UTILISATEUR']
    },
    {
      label: 'Dashboard',
      icon: 'bar-chart',
      route: '/admin-backoffice/dashboard',
      roles: ['UTILISATEUR', 'ROLE_UTILISATEUR']
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🔐 SidebarComponent - Initialisation');
    
    // Charger les menus initialement
    this.loadMenus();
    
    // Écouter les changements de route (surtout après le login)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('🔄 Changement de route détecté');
      this.checkCurrentRoute();
      this.loadMenus();
    });
  }

  loadMenus(): void {
    console.log('📥 Chargement des menus');
    
    // Récupérer le rôle frais
    this.userRole = this.authService.getRole() || '';
    console.log('📋 Rôle utilisateur brut:', this.userRole);
    
    const upperRole = this.userRole?.toUpperCase() || '';
    const isAdmin = upperRole.includes('SUPERADMIN') || upperRole.includes('SUPER_ADMIN');
    
    console.log('👑 Est Super Admin?:', isAdmin);
    
    this.isSuperAdmin = isAdmin;
    
    // Filtrer les menus selon le rôle
    this.filterMenusByRole();
    
    // Forcer la détection des changements
    this.cdr.markForCheck();
  }

  /**
   * Vérifier si la route actuelle est /login
   */
  checkCurrentRoute(): void {
    const currentRoute = this.router.url;
    console.log('📍 Route actuelle:', currentRoute);
    
    // Ne pas afficher la sidebar sur /login
    this.showSidebar = currentRoute !== '/login';
    console.log('🎯 Afficher sidebar:', this.showSidebar);
  }

  /**
   * Filtrer les menus selon le rôle de l'utilisateur
   */
  filterMenusByRole(): void {
    console.log('🔍 Filtrage des menus pour le rôle:', this.userRole);
    console.log('🔍 isSuperAdmin:', this.isSuperAdmin);
    
    // Si c'est un SUPER ADMIN, afficher UNIQUEMENT le menu simplifié
    if (this.isSuperAdmin) {
      this.filteredMenuItems = [
        {
          label: 'Gestion des utilisateurs',
          icon: 'settings',
          route: '/admin/dashboard',
          roles: ['ROLE_SUPERADMIN']
        }
      ];
      console.log('👑 Menu SUPER ADMIN UNIQUEMENT - 1 item');
      console.log('   ✅ Gestion des utilisateurs -> /admin/dashboard');
    } else {
      // Sinon, afficher les menus UTILISATEUR normaux
      this.filteredMenuItems = this.allMenuItems.filter(item => 
        item.roles.some(role => 
          this.userRole?.toUpperCase().includes(role.toUpperCase())
        )
      );
      console.log('📊 Menus UTILISATEUR affichés:', this.filteredMenuItems.length);
      this.filteredMenuItems.forEach(item => {
        console.log('  ✅', item.label, '-', item.route);
      });
    }
  }

  /**
   * Basculer la sidebar
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Obtenir l'affichage du rôle
   */
  getRoleDisplay(): string {
    if (!this.userRole) return 'Utilisateur';
    
    const displayName = this.userRole
      .replace('ROLE_', '')
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return displayName;
  }

  /**
   * Déconnexion
   */
  logout(): void {
    console.log('👋 Déconnexion');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /**
   * Obtenir l'icône SVG
   */
  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'gauge': '⚙️',
      'clipboard': '📋',
      'map': '🗺️',
      'bar-chart': '📊',
      'settings': '⚡'
    };
    return icons[iconName] || '•';
  }
}