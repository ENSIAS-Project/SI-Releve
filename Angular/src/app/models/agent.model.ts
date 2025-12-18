// src/app/models/agent.model.ts

export interface Agent {
  id_agent: number;
  nom: string;
  prenom: string;
  tel_personnel?: string;
  tel_professionnel: string;
  nom_quartier?: string;
  id_quartier?: number;
}

export interface Quartier {
  id_quartier: number;
  nom_quartier: string;
}

export interface AffectationRequest {
  id_quartier: number;
}
