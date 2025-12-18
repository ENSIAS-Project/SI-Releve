import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService, AgentService],
  templateUrl: './agent-affectation.html',
  styleUrls: ['./agent-affectation.css']
})
export class AgentAffectationComponent implements OnInit {
  agents: Agent[] = [];
  quartiers: Quartier[] = [];
  selectedQuartier: { [key: number]: number | null } = {};
  editingAgent: number | null = null;
  loading: boolean = false;

  constructor(
    private agentService: AgentService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Initialisation du composant');
    
    const token = localStorage.getItem('auth_token');
    console.log('📋 Token dans localStorage:', token ? '✅ Présent' : '❌ ABSENT');
    
    this.loadAgents();
    this.loadQuartiers();
  }

  loadAgents(): void {
    console.log('📥 Chargement des agents');
    this.loading = true;
    
    this.agentService.getAgents(0, 1000).subscribe({
      next: (response) => {
        console.log('✅ Agents reçus:', response);
        this.agents = response.content || [];
        this.loading = false;
        console.log('📊 Nombre agents:', this.agents.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur agents:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les agents'
        });
        this.loading = false;
      }
    });
  }

  loadQuartiers(): void {
    console.log('📥 Chargement des quartiers');
    
    this.agentService.getQuartiers().subscribe({
      next: (quartiers) => {
        console.log('✅ Quartiers reçus:', quartiers);
        this.quartiers = quartiers || [];
        console.log('📊 Nombre quartiers:', this.quartiers.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur quartiers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les quartiers'
        });
      }
    });
  }

  startEdit(agent: Agent): void {
    console.log('✏️ Édition agent:', agent);
    this.editingAgent = agent.idAgent;
    
    // Initialiser la sélection avec le quartier actuel
    const quartier = this.quartiers.find(q => q.nomQuartier === agent.nomQuartier);
    this.selectedQuartier[agent.idAgent] = quartier?.idQuartier || null;
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    console.log('❌ Annulation');
    this.editingAgent = null;
    this.selectedQuartier = {};
    this.cdr.detectChanges();
  }

  affecterQuartier(agent: Agent): void {
    const quartierSelectionne = this.selectedQuartier[agent.idAgent];
    console.log('🏘️ Affectation:', quartierSelectionne);
    
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
        console.log('✅ Agent mis à jour:', updatedAgent);
        
        // Mettre à jour l'agent dans la liste
        const index = this.agents.findIndex(a => a.idAgent === agent.idAgent);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }
        
        // Afficher le message de succès
        const nomQuartier = this.quartiers.find(q => q.idQuartier === quartierSelectionne)?.nomQuartier;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Agent affecté au quartier ${nomQuartier}`
        });
        
        this.editingAgent = null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur affectation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de modifier l\'affectation'
        });
        this.loading = false;
      }
    });
  }

  getQuartiersDisponibles(): Quartier[] {
    return this.quartiers;
  }
}