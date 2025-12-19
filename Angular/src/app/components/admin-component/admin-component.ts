import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserResponseDto, UserCreateDto, UserUpdateDto, Roles } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component'; // Ajoutez cet import

// Interface pour les items du menu (identique à celle du sidebar)
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

export type FilterType = 'all' | 'superadmin' | 'backoffice';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule], // Ajoutez SidebarComponent ici
  providers: [MessageService],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.css']
})
export class AdminComponent implements OnInit {
  // CONFIGURATION DU SIDEBAR POUR SUPER ADMIN
  superAdminMenuItems: MenuItem[] = [
    {
      label: 'Gestion des utilisateurs',
      icon: 'users',
      route: '/admin/dashboard' // Ajustez selon votre routing
    }
  ];
  
  userRole = 'Super Administrateur';

  // LOGIQUE MÉTIER EXISTANTE (INCHANGÉE)
  utilisateurs: UserResponseDto[] = [];
  filteredUtilisateurs: UserResponseDto[] = [];
  currentFilter: FilterType = 'all';
  
  // Pagination
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  
  // Modal
  showModal = false;
  modalType: 'add' | 'edit' = 'add';
  isLoading = true;
  
  selectedUtilisateur: Partial<UserResponseDto> = {
    nom: '',
    prenom: '',
    roles: Roles.ROLE_UTILISATEUR,
    email: ''
  };

  Roles = Roles;
  Math = Math;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  // TOUTE VOTRE LOGIQUE MÉTIER EXISTANTE RESTE INCHANGÉE CI-DESSOUS

  loadUtilisateurs(page: number = 0, sort: string = 'nom,asc'): void {
    this.isLoading = true;
    this.cdr.markForCheck();
    
    this.userService.getAllUsers(page, this.pageSize, sort).subscribe({
      next: (response) => {
        if (!response) {
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }

        if (!response.content || !Array.isArray(response.content)) {
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }

        this.utilisateurs = response.content;
        this.currentPage = response.number ?? 0;
        this.totalElements = response.totalElements ?? 0;
        this.totalPages = response.totalPages ?? 0;
        
        this.applyFilter(this.currentFilter);
        
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les utilisateurs'
        });
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  applyFilter(filter: FilterType): void {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredUtilisateurs = [...this.utilisateurs];
    } else if (filter === 'superadmin') {
      this.filteredUtilisateurs = this.utilisateurs.filter(
        u => u.roles === Roles.ROLE_SUPERADMIN
      );
    } else if (filter === 'backoffice') {
      this.filteredUtilisateurs = this.utilisateurs.filter(
        u => u.roles === Roles.ROLE_UTILISATEUR
      );
    }
    
    this.cdr.markForCheck();
  }

  getRoleDisplay(role: Roles): string {
    return role === Roles.ROLE_SUPERADMIN ? 'Super Admin' : 'Admin Backoffice';
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.selectedUtilisateur = {
      nom: '',
      prenom: '',
      roles: Roles.ROLE_UTILISATEUR,
      email: ''
    };
    this.showModal = true;
    this.cdr.markForCheck();
  }

  openEditModal(utilisateur: UserResponseDto): void {
    this.modalType = 'edit';
    this.selectedUtilisateur = { ...utilisateur };
    this.showModal = true;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUtilisateur = {
      nom: '',
      prenom: '',
      roles: Roles.ROLE_UTILISATEUR,
      email: ''
    };
    this.cdr.markForCheck();
  }

  capitalizeNom(nom: string): string {
    return nom.toUpperCase();
  }

  capitalizePrenom(prenom: string): string {
    return prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
  }

  saveUtilisateur(): void {
    this.selectedUtilisateur.nom = this.capitalizeNom(this.selectedUtilisateur.nom || '');
    this.selectedUtilisateur.prenom = this.capitalizePrenom(this.selectedUtilisateur.prenom || '');

    this.isLoading = true;
    this.cdr.markForCheck();

    if (this.modalType === 'add') {
      const newUser: UserCreateDto = {
        nom: this.selectedUtilisateur.nom!,
        prenom: this.selectedUtilisateur.prenom!,
        email: this.selectedUtilisateur.email!,
        roles: this.selectedUtilisateur.roles!
      };
      
      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `Utilisateur ${response.prenom} ${response.nom} ajouté avec succès`
          });
          this.loadUtilisateurs(this.currentPage);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error?.message || 'Impossible d\'ajouter l\'utilisateur'
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
      
    } else {
      const updateUser: UserUpdateDto = {
        idUser: this.selectedUtilisateur.idUser!,
        nom: this.selectedUtilisateur.nom!,
        prenom: this.selectedUtilisateur.prenom!,
        email: this.selectedUtilisateur.email!,
        roles: this.selectedUtilisateur.roles!
      };
      
      this.userService.updateUser(updateUser).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `Utilisateur ${response.prenom} ${response.nom} modifié avec succès`
          });
          this.loadUtilisateurs(this.currentPage);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error?.message || 'Impossible de modifier l\'utilisateur'
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  deleteUtilisateur(utilisateur: UserResponseDto): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${utilisateur.prenom} ${utilisateur.nom} ?`)) {
      this.isLoading = true;
      this.cdr.markForCheck();
      
      this.userService.deleteUser(utilisateur.idUser).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `Utilisateur ${utilisateur.prenom} ${utilisateur.nom} supprimé avec succès`
          });
          
          if (this.utilisateurs.length === 1 && this.currentPage > 0) {
            this.loadUtilisateurs(this.currentPage - 1);
          } else {
            this.loadUtilisateurs(this.currentPage);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error?.message || 'Impossible de supprimer l\'utilisateur'
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadUtilisateurs(page);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.loadUtilisateurs(0);
  }
}