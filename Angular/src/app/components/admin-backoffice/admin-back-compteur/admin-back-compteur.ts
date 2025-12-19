import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../../../shared/sidebar-component/sidebar-component';
import { CompteurService, Client, CompteurResponse, CreateCompteurRequest, CompteurType } from '../../../services/compteur.service';

export type FilterTypeCompteur = 'all' | 'eau' | 'electricite';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './admin-back-compteur.html',
  styleUrl: './admin-back-compteur.css'
})
export class CompteurComponent implements OnInit {
  // Configuration du sidebar
  compteurMenuItems: MenuItem[] = [
    {
      label: 'Gestion des compteurs',
      icon: 'meter',
      route: '/admin-backoffice/compteur'
    },
    {
      label: 'Gestion des relevés',
      icon: 'clipboard',
      route: '/admin/releves'
    },
    {
      label: 'Affectation quartier',
      icon: 'map',
      route: '/admin/affectations'
    }
  ];
  
  userRole = 'Admin Backoffice';

  // Données
  compteurs: any[] = [];
  filteredCompteurs: any[] = [];
  currentFilter: FilterTypeCompteur = 'all';
  
  clients: Client[] = [];
  
  showModal = false;
  modalType: 'add' | 'edit' = 'add';
  loading = false;
  
  selectedCompteur: any = {
    id_compteur: 0,
    type_compteur: CompteurType.EAU,
    adresse: '',
    label_client: ''
  };
  
  selectedClientId: number = 0;

  constructor(
    private compteurService: CompteurService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Initialisation du composant Compteur');
    this.loadClients();
    this.loadCompteurs();
  }

  loadClients(): void {
    console.log('📥 Chargement des clients');
    this.compteurService.getAllClients().subscribe({
      next: (data: any) => {
        console.log('✅ Clients reçus:', data);
        console.log('📊 Type de data:', typeof data);
        console.log('📊 Est un array?', Array.isArray(data));
        if (Array.isArray(data) && data.length > 0) {
          console.log('📊 Premier client:', data[0]);
          console.log('📊 Clés du premier client:', Object.keys(data[0]));
        }
        // Gérer les deux formats possibles
        this.clients = Array.isArray(data) ? data : (data.content || []);
        console.log('📋 Clients assignés:', this.clients);
        console.log('📋 Nombre de clients:', this.clients.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur clients:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les clients'
        });
      }
    });
  }

  loadCompteurs(): void {
    console.log('📥 Chargement des compteurs');
    this.loading = true;
    
    this.compteurService.getAllCompteurs().subscribe({
      next: (data: any) => {
        console.log('✅ Compteurs reçus:', data);
        console.log('📊 Type de data:', typeof data);
        console.log('📊 Est un array?', Array.isArray(data));
        if (Array.isArray(data) && data.length > 0) {
          console.log('📊 Premier compteur:', data[0]);
          console.log('📊 Clés du premier compteur:', Object.keys(data[0]));
          console.log('📊 id_compteur:', data[0]['id_compteur']);
          console.log('📊 label_client:', data[0]['label_client']);
          console.log('📊 adresse:', data[0]['adresse']);
          console.log('📊 type_compteur:', data[0]['type_compteur']);
        }
        this.compteurs = Array.isArray(data) ? data : (data.content || []);
        console.log('📋 Compteurs assignés:', this.compteurs);
        console.log('📋 Nombre de compteurs:', this.compteurs.length);
        this.applyFilter('all');
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur compteurs:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les compteurs'
        });
        this.loading = false;
      }
    });
  }

  applyFilter(filter: FilterTypeCompteur): void {
    console.log('🔍 Filtre appliqué:', filter);
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredCompteurs = [...this.compteurs];
    } else if (filter === 'eau') {
      this.filteredCompteurs = this.compteurs.filter(
        c => c.type_compteur === CompteurType.EAU
      );
    } else if (filter === 'electricite') {
      this.filteredCompteurs = this.compteurs.filter(
        c => c.type_compteur === CompteurType.ELECTRICITE
      );
    }
  }

  getTypeDisplay(type: CompteurType): string {
    switch (type) {
      case CompteurType.EAU:
        return 'Eau';
      case CompteurType.ELECTRICITE:
        return 'Électricité';
      case CompteurType.GAZ:
        return 'Gaz';
      default:
        return type;
    }
  }

  getClientDisplay(label: string): string {
    return label;
  }

  openAddModal(): void {
    console.log('🔓 Ouverture modal d\'ajout');
    this.modalType = 'add';
    this.selectedCompteur = {
      id_compteur: 0,
      type_compteur: CompteurType.EAU,
      adresse: '',
      label_client: ''
    };
    this.selectedClientId = 0;
    this.showModal = true;
  }

  openEditModal(compteur: any): void {
    console.log('🔓 Ouverture modal d\'édition');
    this.modalType = 'edit';
    this.selectedCompteur = { ...compteur };
    // Trouver le client correspondant par label_client
    const client = this.clients.find(c => c.label_client === compteur.label_client);
    this.selectedClientId = client?.id_client || 0;
    this.showModal = true;
  }

  closeModal(): void {
    console.log('❌ Fermeture du modal');
    this.showModal = false;
  }

  saveCompteur(): void {
    console.log('💾 Sauvegarde du compteur');
    
    if (!this.selectedClientId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez sélectionner un client'
      });
      return;
    }

    if (!this.selectedCompteur.adresse) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez entrer une adresse'
      });
      return;
    }

    this.loading = true;

    const request: CreateCompteurRequest = {
      id_client: this.selectedClientId,
      adresse: this.selectedCompteur.adresse,
      type_compteur: this.selectedCompteur.type_compteur
    };

    if (this.modalType === 'add') {
      console.log('➕ Création d\'un nouveau compteur');
      this.compteurService.createCompteur(request).subscribe({
        next: (response) => {
          console.log('✅ Compteur créé:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Compteur créé avec succès'
          });
          this.loadCompteurs();
          this.closeModal();
        },
        error: (error) => {
          console.error('❌ Erreur création:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de créer le compteur'
          });
          this.loading = false;
        }
      });
    } else {
      console.log('✏️ Modification du compteur (non implémenté côté backend)');
      // Note: Votre backend n'a pas d'endpoint PUT, donc on recharge juste
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Endpoint de modification non disponible'
      });
      this.closeModal();
      this.loading = false;
    }
  }

  deleteCompteur(compteur: CompteurResponse): void {
    console.log('🗑️ Suppression du compteur:', compteur.id_compteur);
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer le compteur #${compteur.id_compteur} (${compteur.label_client}) ?`)) {
      this.loading = true;
      
      this.compteurService.deleteCompteur(compteur.id_compteur).subscribe({
        next: () => {
          console.log('✅ Compteur supprimé');
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Compteur supprimé avec succès'
          });
          this.loadCompteurs();
        },
        error: (error) => {
          console.error('❌ Erreur suppression:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de supprimer le compteur'
          });
          this.loading = false;
        }
      });
    }
  }
}