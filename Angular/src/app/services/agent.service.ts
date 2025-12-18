import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Agent {
  idAgent: number;
  nom: string;
  prenom: string;
  telProfessionnel: string;
  nomQuartier: string | null;
}

export interface Quartier {
  idQuartier: number;
  nomQuartier: string;
}

export interface AffectationRequest {
  idQuartier: number | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = '/api/v1'; // URL de base de votre API Spring Boot

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des agents avec pagination
   * GET /api/v1/agents?page=0&size=10
   */
  getAgents(page: number = 0, size: number = 10): Observable<PageResponse<Agent>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Agent>>(`${this.apiUrl}/agents`, { params });
  }

  /**
   * Récupère uniquement le contenu (agents) sans les métadonnées de pagination
   */
  getAgentsContent(page: number = 0, size: number = 10): Observable<Agent[]> {
    return this.getAgents(page, size).pipe(
      map(response => response.content)
    );
  }

  /**
   * Récupère la liste des quartiers
   * GET /api/v1/quartiers
   */
  getQuartiers(): Observable<Quartier[]> {
    return this.http.get<Quartier[]>(`${this.apiUrl}/quartiers`);
  }

  /**
   * Affecte un agent à un quartier
   * PUT /api/v1/agents/{idAgent}/quartier
   */
  affecterQuartier(idAgent: number, idQuartier: number): Observable<Agent> {
    const body: AffectationRequest = { idQuartier };
    return this.http.put<Agent>(`${this.apiUrl}/agents/${idAgent}/quartier`, body);
  }

  /**
   * Retire l'affectation d'un agent (affecte à null)
   * PUT /api/v1/agents/{idAgent}/quartier
   * 
   * Note: Vous devrez modifier votre backend pour accepter null dans AffectationRequestDto
   * ou créer un endpoint DELETE séparé
   */
  retirerAffectation(idAgent: number): Observable<Agent> {
    const body: AffectationRequest = { idQuartier: null };
    return this.http.put<Agent>(`${this.apiUrl}/agents/${idAgent}/quartier`, body);
  }
}