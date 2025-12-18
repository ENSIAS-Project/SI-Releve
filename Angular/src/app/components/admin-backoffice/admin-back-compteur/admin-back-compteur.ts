import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar-component/sidebar-component';

export interface Client {
  idClient: number;
  nom: string;
  prenom: string;
}

export interface Compteur {
  idCompteur: number;
  typeCompteur: 'EAU' | 'ELECTRICITE';
  adresse: string;
  client: Client;
}

export type FilterTypeCompteur = 'all' | 'eau' | 'electricite';

// Interface pour les items du menu (doit correspondre à celle du sidebar)
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [FormsModule, SidebarComponent], // Ajoutez SidebarComponent ici
  templateUrl: './admin-back-compteur.html',
  styleUrl: './admin-back-compteur.css'
})
export class CompteurComponent implements OnInit {
  // Configuration du sidebar pour ce composant
  compteurMenuItems: MenuItem[] = [
    {
      label: 'Gestion des compteurs',
      icon: 'meter',
      route: '/admin-backoffice/compteur' // Ajustez la route selon votre routing
    },
    {
      label: 'Gestion des relevés',
      icon: 'clipboard',
      route: '/admin/releves' // Ajustez la route selon votre routing
    },
    {
      label: 'Affectation quartier',
      icon: 'map',
      route: '/admin/affectations' // Ajustez la route selon votre routing
    }
  ];
  
  userRole = 'Admin Backoffice';

  // Code existant inchangé
  compteurs: Compteur[] = [];
  filteredCompteurs: Compteur[] = [];
  currentFilter: FilterTypeCompteur = 'all';
  
  clients: Client[] = [];
  
  showModal = false;
  modalType: 'add' | 'edit' = 'add';
  
  selectedCompteur: Compteur = {
    idCompteur: 0,
    typeCompteur: 'EAU',
    adresse: '',
    client: { idClient: 0, nom: '', prenom: '' }
  };
  
  selectedClientId: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadClients();
    this.loadCompteurs();
  }

  loadClients(): void {
    // Simuler le chargement des clients
    // Remplacer par votre service HTTP
    this.clients = [
      { idClient: 1, nom: 'ALAMI', prenom: 'Ahmed' },
      { idClient: 2, nom: 'BENANI', prenom: 'Fatima' },
      { idClient: 3, nom: 'TAZI', prenom: 'Mohamed' },
      { idClient: 4, nom: 'IDRISSI', prenom: 'Salma' },
      { idClient: 5, nom: 'FAHMI', prenom: 'Karim' }
    ];
  }

  loadCompteurs(): void {
    // Simuler le chargement des compteurs
    // Remplacer par votre service HTTP
    this.compteurs = [
      {
        idCompteur: 1,
        typeCompteur: 'EAU',
        adresse: '12 Rue Hassan II, Rabat',
        client: { idClient: 1, nom: 'ALAMI', prenom: 'Ahmed' }
      },
      {
        idCompteur: 2,
        typeCompteur: 'ELECTRICITE',
        adresse: '45 Avenue Mohammed V, Casablanca',
        client: { idClient: 2, nom: 'BENANI', prenom: 'Fatima' }
      },
      {
        idCompteur: 3,
        typeCompteur: 'EAU',
        adresse: '78 Boulevard Zerktouni, Marrakech',
        client: { idClient: 3, nom: 'TAZI', prenom: 'Mohamed' }
      },
      {
        idCompteur: 4,
        typeCompteur: 'ELECTRICITE',
        adresse: '23 Rue Al Massira, Fès',
        client: { idClient: 4, nom: 'IDRISSI', prenom: 'Salma' }
      },
      {
        idCompteur: 5,
        typeCompteur: 'EAU',
        adresse: '56 Avenue des FAR, Tanger',
        client: { idClient: 5, nom: 'FAHMI', prenom: 'Karim' }
      }
    ];
    
    this.applyFilter('all');
  }

  applyFilter(filter: FilterTypeCompteur): void {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredCompteurs = [...this.compteurs];
    } else if (filter === 'eau') {
      this.filteredCompteurs = this.compteurs.filter(
        c => c.typeCompteur === 'EAU'
      );
    } else if (filter === 'electricite') {
      this.filteredCompteurs = this.compteurs.filter(
        c => c.typeCompteur === 'ELECTRICITE'
      );
    }
  }

  getTypeDisplay(type: string): string {
    return type === 'EAU' ? 'Eau' : 'Électricité';
  }

  getClientDisplay(client: Client): string {
    return `${client.prenom} ${client.nom}`;
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.selectedCompteur = {
      idCompteur: 0,
      typeCompteur: 'EAU',
      adresse: '',
      client: { idClient: 0, nom: '', prenom: '' }
    };
    this.selectedClientId = 0;
    this.showModal = true;
  }

  openEditModal(compteur: Compteur): void {
    this.modalType = 'edit';
    this.selectedCompteur = { ...compteur };
    this.selectedClientId = compteur.client.idClient;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveCompteur(): void {
    // Associer le client sélectionné
    const client = this.clients.find(c => c.idClient === this.selectedClientId);
    if (!client) {
      alert('Veuillez sélectionner un client');
      return;
    }
    
    this.selectedCompteur.client = client;

    if (this.modalType === 'add') {
      // Ajouter un nouveau compteur
      const newId = Math.max(...this.compteurs.map(c => c.idCompteur), 0) + 1;
      const newCompteur: Compteur = {
        ...this.selectedCompteur,
        idCompteur: newId
      };
      
      this.compteurs.push(newCompteur);
      console.log('Compteur ajouté:', newCompteur);
      
      // Appeler votre service HTTP ici
      // this.compteurService.createCompteur(newCompteur).subscribe(...)
      
    } else {
      // Mettre à jour un compteur existant
      const index = this.compteurs.findIndex(
        c => c.idCompteur === this.selectedCompteur.idCompteur
      );
      
      if (index !== -1) {
        this.compteurs[index] = { ...this.selectedCompteur };
        console.log('Compteur modifié:', this.compteurs[index]);
        
        // Appeler votre service HTTP ici
        // this.compteurService.updateCompteur(this.selectedCompteur).subscribe(...)
      }
    }

    this.applyFilter(this.currentFilter);
    this.closeModal();
  }

  deleteCompteur(compteur: Compteur): void {
    const clientName = this.getClientDisplay(compteur.client);
    if (confirm(`Êtes-vous sûr de vouloir supprimer le compteur ${compteur.idCompteur} de ${clientName} ?`)) {
      this.compteurs = this.compteurs.filter(
        c => c.idCompteur !== compteur.idCompteur
      );
      console.log('Compteur supprimé:', compteur);
      
      // Appeler votre service HTTP ici
      // this.compteurService.deleteCompteur(compteur.idCompteur).subscribe(...)
      
      this.applyFilter(this.currentFilter);
    }
  }
}