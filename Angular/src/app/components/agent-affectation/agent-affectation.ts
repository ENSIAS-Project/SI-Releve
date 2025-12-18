import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

// Service
import { AgentService, Agent, Quartier } from '../../services/agent.service';

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
  loading: boolean = false;
  
  // Pagination
  totalRecords: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private agentService: AgentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadQuartiers();
  }

  /**
   * Charge la liste des agents depuis le backend
   */
  loadAgents(page: number = 0, size: number = 10): void {
    this.loading = true;
    
    this.agentService.getAgents(page, size).subscribe({
      next: (response) => {
        this.agents = response.content;
        this.totalRecords = response.totalElements;
        this.currentPage = response.number;
        this.pageSize = response.size;
        this.loading = false;
      },
     
    });
  }

  /**
   * Charge la liste des quartiers depuis le backend
   */
  loadQuartiers(): void {
    this.agentService.getQuartiers().subscribe({
      next: (quartiers) => {
        this.quartiers = quartiers;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des quartiers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger la liste des quartiers'
        });
      }
    });
  }

  /**
   * Gestion du changement de page dans le tableau
   */
  onPageChange(event: any): void {
    const page = event.first / event.rows;
    this.loadAgents(page, event.rows);
  }

  /**
   * Démarre l'édition d'un agent
   */
  startEdit(agent: Agent): void {
    this.editingAgent = agent.idAgent;
    // Trouver l'ID du quartier actuel si l'agent est déjà affecté
    const quartier = this.quartiers.find(q => q.nomQuartier === agent.nomQuartier);
    this.selectedQuartier[agent.idAgent] = quartier?.idQuartier || null;
  }

  /**
   * Annule l'édition
   */
  cancelEdit(): void {
    this.editingAgent = null;
    this.selectedQuartier = {};
  }

  /**
   * Affecte un quartier à un agent
   */
  affecterQuartier(agent: Agent): void {
    const quartierSelectionne = this.selectedQuartier[agent.idAgent];
    
    if (!quartierSelectionne) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez sélectionner un quartier'
      });
      return;
    }

    this.loading = true;
    
    this.agentService.affecterQuartier(agent.idAgent, quartierSelectionne).subscribe({
      next: (updatedAgent) => {
        // Mettre à jour l'agent dans la liste locale
        const index = this.agents.findIndex(a => a.idAgent === agent.idAgent);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `L'agent ${updatedAgent.prenom} ${updatedAgent.nom} a été affecté au quartier ${updatedAgent.nomQuartier}`
        });
        
        this.editingAgent = null;
        this.selectedQuartier[agent.idAgent] = null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'affectation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.error?.message || 'Impossible d\'affecter l\'agent au quartier'
        });
        this.loading = false;
      }
    });
  }

  /**
   * Retire l'affectation d'un agent
   */
  retirerAffectation(agent: Agent): void {
    this.loading = true;
    
    this.agentService.retirerAffectation(agent.idAgent).subscribe({
      next: (updatedAgent) => {
        // Mettre à jour l'agent dans la liste locale
        const index = this.agents.findIndex(a => a.idAgent === agent.idAgent);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }
        
        this.messageService.add({
          severity: 'info',
          summary: 'Information',
          detail: `L'affectation de l'agent ${updatedAgent.prenom} ${updatedAgent.nom} a été retirée`
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du retrait de l\'affectation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.error?.message || 'Impossible de retirer l\'affectation'
        });
        this.loading = false;
      }
    });
  }

  /**
   * Retourne la liste des quartiers disponibles
   */
  getQuartiersDisponibles(): Quartier[] {
    return this.quartiers;
  }
}