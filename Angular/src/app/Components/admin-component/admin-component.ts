import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Utilisateur {
  idUser: number;
  nom: string;
  prenom: string;
  roles: 'ROLE_SUPERADMIN' | 'ROLE_UTILISATEUR';
  email: string;
  motDePasse?: string;
  dateCreation?: string;
  dateModification?: string;
}

export type FilterType = 'all' | 'superadmin' | 'backoffice';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  currentFilter: FilterType = 'all';
  
  showModal = false;
  modalType: 'add' | 'edit' = 'add';
  
  selectedUtilisateur: Utilisateur = {
    idUser: 0,
    nom: '',
    prenom: '',
    roles: 'ROLE_UTILISATEUR',
    email: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    // Simuler le chargement des données
    // Remplacer par votre service HTTP
    this.utilisateurs = [
      {
        idUser: 1,
        nom: 'ALAMI',
        prenom: 'Ahmed',
        roles: 'ROLE_SUPERADMIN',
        email: 'ahmed.alami@example.com',
        dateCreation: '2024-01-15',
        dateModification: '2024-01-15'
      },
      {
        idUser: 2,
        nom: 'BENANI',
        prenom: 'Fatima',
        roles: 'ROLE_UTILISATEUR',
        email: 'fatima.benani@example.com',
        dateCreation: '2024-02-20',
        dateModification: '2024-02-20'
      },
      {
        idUser: 3,
        nom: 'TAZI',
        prenom: 'Mohamed',
        roles: 'ROLE_UTILISATEUR',
        email: 'mohamed.tazi@example.com',
        dateCreation: '2024-03-10',
        dateModification: '2024-03-10'
      }
    ];
    
    this.applyFilter('all');
  }

  applyFilter(filter: FilterType): void {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredUtilisateurs = [...this.utilisateurs];
    } else if (filter === 'superadmin') {
      this.filteredUtilisateurs = this.utilisateurs.filter(
        u => u.roles === 'ROLE_SUPERADMIN'
      );
    } else if (filter === 'backoffice') {
      this.filteredUtilisateurs = this.utilisateurs.filter(
        u => u.roles === 'ROLE_UTILISATEUR'
      );
    }
  }

  getRoleDisplay(role: string): string {
    return role === 'ROLE_SUPERADMIN' ? 'Super Admin' : 'Admin Backoffice';
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.selectedUtilisateur = {
      idUser: 0,
      nom: '',
      prenom: '',
      roles: 'ROLE_UTILISATEUR',
      email: ''
    };
    this.showModal = true;
  }

  openEditModal(utilisateur: Utilisateur): void {
    this.modalType = 'edit';
    this.selectedUtilisateur = { ...utilisateur };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  capitalizeNom(nom: string): string {
    return nom.toUpperCase();
  }

  capitalizePrenom(prenom: string): string {
    return prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
  }

  saveUtilisateur(): void {
    // Normaliser les données
    this.selectedUtilisateur.nom = this.capitalizeNom(this.selectedUtilisateur.nom);
    this.selectedUtilisateur.prenom = this.capitalizePrenom(this.selectedUtilisateur.prenom);

    if (this.modalType === 'add') {
      // Ajouter un nouvel utilisateur
      const newId = Math.max(...this.utilisateurs.map(u => u.idUser), 0) + 1;
      const newUser: Utilisateur = {
        ...this.selectedUtilisateur,
        idUser: newId,
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString()
      };
      
      this.utilisateurs.push(newUser);
      console.log('Utilisateur ajouté:', newUser);
      
      // Appeler votre service HTTP ici
      // this.userService.createUser(newUser).subscribe(...)
      
    } else {
      // Mettre à jour un utilisateur existant
      const index = this.utilisateurs.findIndex(
        u => u.idUser === this.selectedUtilisateur.idUser
      );
      
      if (index !== -1) {
        this.utilisateurs[index] = {
          ...this.selectedUtilisateur,
          dateModification: new Date().toISOString()
        };
        console.log('Utilisateur modifié:', this.utilisateurs[index]);
        
        // Appeler votre service HTTP ici
        // this.userService.updateUser(this.selectedUtilisateur).subscribe(...)
      }
    }

    this.applyFilter(this.currentFilter);
    this.closeModal();
  }

  deleteUtilisateur(utilisateur: Utilisateur): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${utilisateur.prenom} ${utilisateur.nom} ?`)) {
      this.utilisateurs = this.utilisateurs.filter(
        u => u.idUser !== utilisateur.idUser
      );
      console.log('Utilisateur supprimé:', utilisateur);
      
      // Appeler votre service HTTP ici
      // this.userService.deleteUser(utilisateur.idUser).subscribe(...)
      
      this.applyFilter(this.currentFilter);
    }
  }
}