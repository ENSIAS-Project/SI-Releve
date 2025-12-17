// src/app/components/agent-affectation/agent-affectation.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { Table, TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { Toast, ToastModule } from 'primeng/toast';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

import { Agent, Quartier } from '../../models/agent.model';
import { AgentService } from '../../services/agent';

@Component({
  selector: 'app-agent-affectation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    ToastModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  templateUrl: './agent-affectation.html',
  styleUrls: ['./agent-affectation.css'],
  providers: [MessageService]
})
export class AgentAffectationComponent implements OnInit {
  agents: Agent[] = [];
  quartiers: Quartier[] = [];
  loading: boolean = false;
  editingAgent: number | null = null;
  selectedQuartier: number | null = null;

  constructor(
    private agentService: AgentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    this.agentService.getAgents().subscribe({
      next: (agents) => {
        this.agents = agents;
      },
      error: (error) => {
        this.showError('Erreur lors du chargement des agents');
        this.loading = false;
      }
    });

    this.agentService.getQuartiers().subscribe({
      next: (quartiers) => {
        this.quartiers = quartiers;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Erreur lors du chargement des quartiers');
        this.loading = false;
      }
    });
  }

  startEditing(agent: Agent): void {
    this.editingAgent = agent.id_agent;
    this.selectedQuartier = agent.id_quartier || null;
  }

  cancelEditing(): void {
    this.editingAgent = null;
    this.selectedQuartier = null;
  }

  saveAffectation(agent: Agent): void {
    if (this.selectedQuartier) {
      this.agentService.affecterQuartier(agent.id_agent, { 
        id_quartier: this.selectedQuartier 
      }).subscribe({
        next: () => {
          this.showSuccess('Quartier affecté avec succès');
          this.loadData();
          this.cancelEditing();
        },
        error: () => {
          this.showError('Erreur lors de l\'affectation');
        }
      });
    }
  }

  retirerAffectation(agent: Agent): void {
    this.agentService.retirerAffectation(agent.id_agent).subscribe({
      next: () => {
        this.showSuccess('Affectation retirée avec succès');
        this.loadData();
      },
      error: () => {
        this.showError('Erreur lors de la suppression');
      }
    });
  }

  isEditing(agentId: number): boolean {
    return this.editingAgent === agentId;
  }

  getQuartierNom(id_quartier?: number): string {
    if (!id_quartier) return '';
    const quartier = this.quartiers.find(q => q.id_quartier === id_quartier);
    return quartier ? quartier.nom_quartier : '';
  }

  private showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message,
      life: 3000
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: message,
      life: 3000
    });
  }
}