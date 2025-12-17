// src/app/services/agent.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Agent, Quartier, AffectationRequest } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  // Fake data pour les quartiers
  private quartiers: Quartier[] = [
    { id_quartier: 1, nom_quartier: 'Centre Ville' },
    { id_quartier: 2, nom_quartier: 'Hay Riad' },
    { id_quartier: 3, nom_quartier: 'Agdal' },
    { id_quartier: 4, nom_quartier: 'Souissi' },
    { id_quartier: 5, nom_quartier: 'Hassan' },
    { id_quartier: 6, nom_quartier: 'Aviation' },
    { id_quartier: 7, nom_quartier: 'Océan' }
  ];

  // Fake data pour les agents
  private agents: Agent[] = [
    {
      id_agent: 1,
      nom: 'Alami',
      prenom: 'Mohammed',
      tel_personnel: '0612345678',
      tel_professionnel: '0537123456',
      nom_quartier: 'Centre Ville',
      id_quartier: 1
    },
    {
      id_agent: 2,
      nom: 'Benali',
      prenom: 'Fatima',
      tel_personnel: '0623456789',
      tel_professionnel: '0537234567',
      nom_quartier: 'Hay Riad',
      id_quartier: 2
    },
    {
      id_agent: 3,
      nom: 'Chakir',
      prenom: 'Karim',
      tel_personnel: '0634567890',
      tel_professionnel: '0537345678',
      nom_quartier: undefined,
      id_quartier: undefined
    },
    {
      id_agent: 4,
      nom: 'Drissi',
      prenom: 'Amina',
      tel_personnel: '0645678901',
      tel_professionnel: '0537456789',
      nom_quartier: 'Agdal',
      id_quartier: 3
    },
    {
      id_agent: 5,
      nom: 'El Fassi',
      prenom: 'Omar',
      tel_personnel: '0656789012',
      tel_professionnel: '0537567890',
      nom_quartier: undefined,
      id_quartier: undefined
    },
    {
      id_agent: 6,
      nom: 'Filali',
      prenom: 'Nadia',
      tel_personnel: '0667890123',
      tel_professionnel: '0537678901',
      nom_quartier: 'Souissi',
      id_quartier: 4
    }
  ];

  constructor() { }

  getAgents(page: number = 0, size: number = 10): Observable<Agent[]> {
    // Simulation d'un appel API avec délai
    return of(this.agents).pipe(delay(300));
  }

  getQuartiers(): Observable<Quartier[]> {
    return of(this.quartiers).pipe(delay(200));
  }

  affecterQuartier(id_agent: number, affectation: AffectationRequest): Observable<any> {
    // Simulation de l'affectation
    const agent = this.agents.find(a => a.id_agent === id_agent);
    const quartier = this.quartiers.find(q => q.id_quartier === affectation.id_quartier);
    
    if (agent && quartier) {
      agent.id_quartier = quartier.id_quartier;
      agent.nom_quartier = quartier.nom_quartier;
    }
    
    return of({ success: true }).pipe(delay(300));
  }

  retirerAffectation(id_agent: number): Observable<any> {
    // Simulation de la suppression d'affectation
    const agent = this.agents.find(a => a.id_agent === id_agent);
    
    if (agent) {
      agent.id_quartier = undefined;
      agent.nom_quartier = undefined;
    }
    
    return of({ success: true }).pipe(delay(300));
  }
}