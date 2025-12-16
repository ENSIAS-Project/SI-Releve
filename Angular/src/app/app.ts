import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar-component/sidebar-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent  // ⚠️ IMPORTANT : Importez le SidebarComponent ici
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'SI-Relevé';
}