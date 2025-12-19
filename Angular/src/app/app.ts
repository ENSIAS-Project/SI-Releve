import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './shared/sidebar-component/sidebar-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, SidebarComponent],
  template: `
    <div [class.app-container]="!isLoginPage" [class.login-page]="isLoginPage">
      <app-sidebar></app-sidebar>
      <main [class.main-content]="!isLoginPage" [class.login-content]="isLoginPage">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
    }
    
    .login-page {
      display: block;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      margin-left: 280px;
      transition: margin-left 0.3s ease;
      padding: 20px;
      background: #f5f5f5;
      overflow-y: auto;
    }
    
    .login-content {
      width: 100%;
      height: 100vh;
      padding: 0;
      margin: 0;
      background: #f5f5f5;
      overflow-y: auto;
    }
    
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class App implements OnInit {
  protected readonly title = signal('SI-releve');
  isLoginPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vérifier la route initiale
    this.checkRoute();
    
    // Écouter les changements de route
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  private checkRoute(): void {
    this.isLoginPage = this.router.url === '/login';
  }
}