import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar-component/sidebar-component';

// Interface pour les items du menu
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

export interface Agent {
  idAgent: number;
  nom: string;
  prenom: string;
  quartier: string; // Le quartier assigné à l'agent
}

export interface Releve {
  idReleve: number;
  clientNomComplet: string;
  adresseClient: string;
  typeCompteur: 'EAU' | 'ELECTRICITE';
  index: number;
  dateReleve: Date;
  agentId: number; // Référence à l'agent qui a fait le relevé
}

@Component({
  selector: 'app-releve',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './releve-component.html',
  styleUrl: './releve-component.css'
})
export class ReleveComponent implements OnInit {
  // CONFIGURATION DU SIDEBAR POUR ADMIN BACKOFFICE
  releveMenuItems: MenuItem[] = [
    {
      label: 'Gestion des compteurs',
      icon: 'meter',
      route: '/admin-backoffice/compteur'
    },
    {
      label: 'Gestion des relevés',
      icon: 'clipboard',
      route: '/admin-backoffice/releve'
    },
    {
      label: 'Affectation quartier',
      icon: 'map',
      route: '/admin/affectations'
    }
  ];
  
  userRole = 'Admin Backoffice';

  // LOGIQUE MÉTIER AVEC AGENTS
  agents: Agent[] = [];
  allReleves: Releve[] = [];
  filteredReleves: Releve[] = [];
  
  selectedAgentId: number = 0;
  selectedAgent: Agent | null = null;
  
  showReleves = false;

  constructor() {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadAllReleves();
  }

  loadAgents(): void {
    // Charger la liste des agents avec leurs quartiers assignés
    this.agents = [
      { idAgent: 1, nom: 'ALAOUI', prenom: 'Hassan', quartier: 'Agdal' },
      { idAgent: 2, nom: 'BERRADA', prenom: 'Amina', quartier: 'Hay Riad' },
      { idAgent: 3, nom: 'CHAFIK', prenom: 'Omar', quartier: 'Ocean' },
      { idAgent: 4, nom: 'DRISSI', prenom: 'Sanaa', quartier: 'Souissi' },
      { idAgent: 5, nom: 'EL AMRANI', prenom: 'Karim', quartier: 'Les Orangers' },
      { idAgent: 6, nom: 'FAHMI', prenom: 'Mehdi', quartier: 'Hassan' },
      { idAgent: 7, nom: 'HASSANI', prenom: 'Samira', quartier: 'Hay Nahda' }
    ];
  }

  loadAllReleves(): void {
    // Données mockées - CHAQUE AGENT A SES PROPRES RELEVÉS
    this.allReleves = [
      // ========== AGENT 1: ALAOUI Hassan (Quartier: Agdal) ==========
      {
        idReleve: 1,
        clientNomComplet: 'Ahmed ALAMI',
        adresseClient: '12 Rue Hassan II, Agdal, Rabat',
        typeCompteur: 'EAU',
        index: 12450,
        dateReleve: new Date('2024-12-15T10:30:00'),
        agentId: 1
      },
      {
        idReleve: 2,
        clientNomComplet: 'Fatima BENANI',
        adresseClient: '45 Avenue Mohammed V, Agdal, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 8920,
        dateReleve: new Date('2024-12-15T11:15:00'),
        agentId: 1
      },
      {
        idReleve: 3,
        clientNomComplet: 'Nadia BENNANI',
        adresseClient: '34 Rue des Roses, Agdal, Rabat',
        typeCompteur: 'EAU',
        index: 13280,
        dateReleve: new Date('2024-12-18T07:30:00'),
        agentId: 1
      },
      {
        idReleve: 4,
        clientNomComplet: 'Rachid ELMOUDEN',
        adresseClient: '89 Avenue Allal Ben Abdellah, Agdal, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 7650,
        dateReleve: new Date('2024-12-18T13:45:00'),
        agentId: 1
      },
      {
        idReleve: 5,
        clientNomComplet: 'Samira KADIRI',
        adresseClient: '23 Rue Ibn Toumert, Agdal, Rabat',
        typeCompteur: 'EAU',
        index: 10890,
        dateReleve: new Date('2024-12-17T09:20:00'),
        agentId: 1
      },

      // ========== AGENT 2: BERRADA Amina (Quartier: Hay Riad) ==========
      {
        idReleve: 6,
        clientNomComplet: 'Mohamed TAZI',
        adresseClient: '23 Boulevard Al Massira, Hay Riad, Rabat',
        typeCompteur: 'EAU',
        index: 15670,
        dateReleve: new Date('2024-12-16T09:00:00'),
        agentId: 2
      },
      {
        idReleve: 7,
        clientNomComplet: 'Salma IDRISSI',
        adresseClient: '78 Rue Al Andalous, Hay Riad, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 11230,
        dateReleve: new Date('2024-12-16T14:20:00'),
        agentId: 2
      },
      {
        idReleve: 8,
        clientNomComplet: 'Hassan BERRADA',
        adresseClient: '56 Avenue des Nations Unies, Hay Riad, Rabat',
        typeCompteur: 'EAU',
        index: 14520,
        dateReleve: new Date('2024-12-17T10:15:00'),
        agentId: 2
      },
      {
        idReleve: 9,
        clientNomComplet: 'Zineb ALAOUI',
        adresseClient: '12 Rue Oued Ziz, Hay Riad, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 9340,
        dateReleve: new Date('2024-12-17T15:30:00'),
        agentId: 2
      },
      {
        idReleve: 10,
        clientNomComplet: 'Youssef MAAROUF',
        adresseClient: '89 Avenue Al Majd, Hay Riad, Rabat',
        typeCompteur: 'EAU',
        index: 12780,
        dateReleve: new Date('2024-12-18T08:45:00'),
        agentId: 2
      },

      // ========== AGENT 3: CHAFIK Omar (Quartier: Ocean) ==========
      {
        idReleve: 11,
        clientNomComplet: 'Karim FAHMI',
        adresseClient: '56 Avenue des FAR, Ocean, Rabat',
        typeCompteur: 'EAU',
        index: 9845,
        dateReleve: new Date('2024-12-17T08:45:00'),
        agentId: 3
      },
      {
        idReleve: 12,
        clientNomComplet: 'Laila MANSOURI',
        adresseClient: '34 Boulevard de la Corniche, Ocean, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 12670,
        dateReleve: new Date('2024-12-18T11:00:00'),
        agentId: 3
      },
      {
        idReleve: 13,
        clientNomComplet: 'Youssef CHRAIBI',
        adresseClient: '78 Rue de la Plage, Ocean, Rabat',
        typeCompteur: 'EAU',
        index: 11234,
        dateReleve: new Date('2024-12-18T14:25:00'),
        agentId: 3
      },
      {
        idReleve: 14,
        clientNomComplet: 'Nadia EL FASSI',
        adresseClient: '45 Avenue de la Mer, Ocean, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 8765,
        dateReleve: new Date('2024-12-15T16:30:00'),
        agentId: 3
      },

      // ========== AGENT 4: DRISSI Sanaa (Quartier: Souissi) ==========
      {
        idReleve: 15,
        clientNomComplet: 'Amina ZIANI',
        adresseClient: '45 Avenue Imam Malik, Souissi, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 10890,
        dateReleve: new Date('2024-12-16T08:30:00'),
        agentId: 4
      },
      {
        idReleve: 16,
        clientNomComplet: 'Omar BENNANI',
        adresseClient: '23 Rue des Jardins, Souissi, Rabat',
        typeCompteur: 'EAU',
        index: 16780,
        dateReleve: new Date('2024-12-16T12:45:00'),
        agentId: 4
      },
      {
        idReleve: 17,
        clientNomComplet: 'Hafsa TAHIRI',
        adresseClient: '67 Avenue Al Amir Fal Ould Oumeir, Souissi, Rabat',
        typeCompteur: 'EAU',
        index: 13450,
        dateReleve: new Date('2024-12-17T09:15:00'),
        agentId: 4
      },
      {
        idReleve: 18,
        clientNomComplet: 'Mehdi RHAZI',
        adresseClient: '89 Boulevard Mohammed VI, Souissi, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 11560,
        dateReleve: new Date('2024-12-18T14:10:00'),
        agentId: 4
      },

      // ========== AGENT 5: EL AMRANI Karim (Quartier: Les Orangers) ==========
      {
        idReleve: 19,
        clientNomComplet: 'Mehdi HAJOUI',
        adresseClient: '89 Rue des Orangers, Les Orangers, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 8760,
        dateReleve: new Date('2024-12-15T16:00:00'),
        agentId: 5
      },
      {
        idReleve: 20,
        clientNomComplet: 'Khadija FASSI',
        adresseClient: '12 Avenue des Palmiers, Les Orangers, Rabat',
        typeCompteur: 'EAU',
        index: 14230,
        dateReleve: new Date('2024-12-16T10:30:00'),
        agentId: 5
      },
      {
        idReleve: 21,
        clientNomComplet: 'Samir FILALI',
        adresseClient: '45 Rue des Roses, Les Orangers, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 9980,
        dateReleve: new Date('2024-12-17T13:20:00'),
        agentId: 5
      },
      {
        idReleve: 22,
        clientNomComplet: 'Fatima ZOUHRI',
        adresseClient: '67 Rue des Lilas, Les Orangers, Rabat',
        typeCompteur: 'EAU',
        index: 11890,
        dateReleve: new Date('2024-12-18T09:45:00'),
        agentId: 5
      },

      // ========== AGENT 6: FAHMI Mehdi (Quartier: Hassan) ==========
      {
        idReleve: 23,
        clientNomComplet: 'Imane SEFRIOUI',
        adresseClient: '34 Boulevard Hassan II, Hassan, Rabat',
        typeCompteur: 'EAU',
        index: 11670,
        dateReleve: new Date('2024-12-15T09:45:00'),
        agentId: 6
      },
      {
        idReleve: 24,
        clientNomComplet: 'Adil KETTANI',
        adresseClient: '56 Avenue Mohammed V, Hassan, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 13450,
        dateReleve: new Date('2024-12-16T11:10:00'),
        agentId: 6
      },
      {
        idReleve: 25,
        clientNomComplet: 'Latifa BENCHEKROUN',
        adresseClient: '78 Rue Patrice Lumumba, Hassan, Rabat',
        typeCompteur: 'EAU',
        index: 12890,
        dateReleve: new Date('2024-12-17T14:40:00'),
        agentId: 6
      },
      {
        idReleve: 26,
        clientNomComplet: 'Yassine BOUCHTA',
        adresseClient: '23 Avenue de la Résistance, Hassan, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 10120,
        dateReleve: new Date('2024-12-18T10:15:00'),
        agentId: 6
      },

      // ========== AGENT 7: HASSANI Samira (Quartier: Hay Nahda) ==========
      {
        idReleve: 27,
        clientNomComplet: 'Yassine LAMRANI',
        adresseClient: '23 Rue Al Massira, Hay Nahda, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 7890,
        dateReleve: new Date('2024-12-15T12:30:00'),
        agentId: 7
      },
      {
        idReleve: 28,
        clientNomComplet: 'Sanaa BOUSFIHA',
        adresseClient: '67 Avenue Al Qods, Hay Nahda, Rabat',
        typeCompteur: 'EAU',
        index: 10450,
        dateReleve: new Date('2024-12-16T15:20:00'),
        agentId: 7
      },
      {
        idReleve: 29,
        clientNomComplet: 'Hamza ALAMI',
        adresseClient: '89 Rue des Lilas, Hay Nahda, Rabat',
        typeCompteur: 'EAU',
        index: 9670,
        dateReleve: new Date('2024-12-17T08:15:00'),
        agentId: 7
      },
      {
        idReleve: 30,
        clientNomComplet: 'Meryem TAZI',
        adresseClient: '12 Boulevard Al Amal, Hay Nahda, Rabat',
        typeCompteur: 'ELECTRICITE',
        index: 11230,
        dateReleve: new Date('2024-12-18T10:50:00'),
        agentId: 7
      },
      {
        idReleve: 31,
        clientNomComplet: 'Rachid MEKKI',
        adresseClient: '45 Rue Ibn Sina, Hay Nahda, Rabat',
        typeCompteur: 'EAU',
        index: 13420,
        dateReleve: new Date('2024-12-18T13:25:00'),
        agentId: 7
      }
    ];
  }

onAgentSelected(): void {
  // Convertir explicitement en number
  const agentId = Number(this.selectedAgentId);
  
  if (agentId === 0) {
    this.showReleves = false;
    this.filteredReleves = [];
    this.selectedAgent = null;
    return;
  }

  // Trouver l'agent sélectionné
  this.selectedAgent = this.agents.find(a => a.idAgent === agentId) || null;
  
  // Filtrer les relevés par agent (avec conversion number)
  this.filteredReleves = this.allReleves.filter(
    r => r.agentId === agentId
  );
  
  console.log('Agent ID:', agentId, typeof agentId);
  console.log('Agent sélectionné:', this.selectedAgent);
  console.log('Relevés filtrés:', this.filteredReleves);
  console.log('Tous les relevés:', this.allReleves);
  
  this.showReleves = true;
}

  // Méthodes d'affichage
  getAgentDisplay(agent: Agent): string {
    return `${agent.prenom} ${agent.nom} - ${agent.quartier}`;
  }

  getTypeDisplay(type: string): string {
    return type === 'EAU' ? 'Eau' : 'Électricité';
  }

  formatDateTime(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  exportToCSV(): void {
    if (this.filteredReleves.length === 0) {
      alert('Aucun relevé à exporter');
      return;
    }

    // Créer le contenu CSV
    let csv = 'Client,Adresse,Type Compteur,Index,Date et Heure Relevé,Agent\n';
    
    this.filteredReleves.forEach(r => {
      const agent = this.agents.find(a => a.idAgent === r.agentId);
      const agentDisplay = agent ? this.getAgentDisplay(agent) : 'Inconnu';
      csv += `"${r.clientNomComplet}","${r.adresseClient}","${this.getTypeDisplay(r.typeCompteur)}",${r.index},"${this.formatDateTime(r.dateReleve)}","${agentDisplay}"\n`;
    });

    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `releves_${this.selectedAgent?.prenom}_${this.selectedAgent?.nom}_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}