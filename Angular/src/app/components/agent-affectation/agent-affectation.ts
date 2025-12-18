import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

interface Agent {
  id_agent: number;
  nom: string;
  prenom: string;
  tel_personnel: string;
  tel_professionnel: string;
  nom_quartier: string | null;
  id_quartier: number | null;
}

interface Quartier {
  id_quartier: number;
  nom_quartier: string;
}

@Component({
  selector: 'app-agent-affectation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './agent-affectation.html',
  styleUrls: ['./agent-affectation.css']
})
export class AgentAffectationComponent implements OnInit {
  agents: Agent[] = [];
  quartiers: Quartier[] = [];
  selectedQuartier: { [key: number]: number | null } = {};
  editingAgent: number | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadFakeData();
  }

  loadFakeData(): void {
    // Fake data pour les quartiers
    this.quartiers = [
      { id_quartier: 1, nom_quartier: 'Centre Ville' },
      { id_quartier: 2, nom_quartier: 'Zone Industrielle' },
      { id_quartier: 3, nom_quartier: 'Quartier Résidentiel Nord' },
      { id_quartier: 4, nom_quartier: 'Quartier Résidentiel Sud' },
      { id_quartier: 5, nom_quartier: 'Zone Commerciale' },
      { id_quartier: 6, nom_quartier: 'Quartier des Affaires' }
    ];

    // Fake data pour les agents
    this.agents = [
      {
        id_agent: 1,
        nom: 'Alami',
        prenom: 'Hassan',
        tel_personnel: '0612345678',
        tel_professionnel: '0523456789',
        nom_quartier: 'Centre Ville',
        id_quartier: 1
      },
      {
        id_agent: 2,
        nom: 'Bennani',
        prenom: 'Fatima',
        tel_personnel: '0698765432',
        tel_professionnel: '0523456790',
        nom_quartier: 'Zone Industrielle',
        id_quartier: 2
      },
      {
        id_agent: 3,
        nom: 'Chakir',
        prenom: 'Mohamed',
        tel_personnel: '0656789012',
        tel_professionnel: '0523456791',
        nom_quartier: null,
        id_quartier: null
      },
      {
        id_agent: 4,
        nom: 'El Amrani',
        prenom: 'Amina',
        tel_personnel: '0634567890',
        tel_professionnel: '0523456792',
        nom_quartier: 'Quartier Résidentiel Nord',
        id_quartier: 3
      },
      {
        id_agent: 5,
        nom: 'Fassi',
        prenom: 'Youssef',
        tel_personnel: '0645678901',
        tel_professionnel: '0523456793',
        nom_quartier: null,
        id_quartier: null
      }
    ];
  }

  startEdit(agent: Agent): void {
    this.editingAgent = agent.id_agent;
    this.selectedQuartier[agent.id_agent] = agent.id_quartier;
  }

  cancelEdit(): void {
    this.editingAgent = null;
    this.selectedQuartier = {};
  }

  affecterQuartier(agent: Agent): void {
    const quartierSelectionne = this.selectedQuartier[agent.id_agent];
    
    if (!quartierSelectionne) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez sélectionner un quartier'
      });
      return;
    }

    // Trouver le nom du quartier
    const quartier = this.quartiers.find(q => q.id_quartier === quartierSelectionne);
    
    if (quartier) {
      agent.id_quartier = quartier.id_quartier;
      agent.nom_quartier = quartier.nom_quartier;
      
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: `L'agent ${agent.prenom} ${agent.nom} a été affecté au quartier ${quartier.nom_quartier}`
      });
      
      this.editingAgent = null;
      this.selectedQuartier[agent.id_agent] = null;
    }
  }

  retirerAffectation(agent: Agent): void {
    agent.id_quartier = null;
    agent.nom_quartier = null;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: `L'affectation de l'agent ${agent.prenom} ${agent.nom} a été retirée`
    });
  }

  getQuartiersDisponibles(): Quartier[] {
    return this.quartiers;
  }
}