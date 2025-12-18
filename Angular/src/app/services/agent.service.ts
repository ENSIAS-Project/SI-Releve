import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Agent {
  id_agent: number;
  nom: string;
  prenom: string;
  tel_professionnel: string;
  nom_quartier: string | null;
}

export interface AgentDetailed extends Agent {
  tel_personnel?: string;
  id_quartier?: number | null;
}

export interface Quartier {
  id_quartier: number;
  nom_quartier: string;
}

export interface AffectationRequest {
  id_quartier: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = '/api'; // À remplacer par votre URL API

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des agents avec pagination
   * GET /agents?page=0&size=10
   */
  getAgents(page: number = 0, size: number = 10): Observable<Agent[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Pour le moment, retourner des fake data
    return this.getFakeAgents().pipe(delay(500));
    
    // Lorsque le backend sera prêt, décommenter :
    // return this.http.get<Agent[]>(`${this.apiUrl}/agents`, { params });
  }

  /**
   * Récupère la liste des quartiers
   * GET /quartiers
   */
  getQuartiers(): Observable<Quartier[]> {
    // Pour le moment, retourner des fake data
    return this.getFakeQuartiers().pipe(delay(300));
    
    // Lorsque le backend sera prêt, décommenter :
    // return this.http.get<Quartier[]>(`${this.apiUrl}/quartiers`);
  }

  /**
   * Affecte un agent à un quartier
   * PUT /agents/{id_agent}/quartier
   */
  affecterQuartier(idAgent: number, idQuartier: number): Observable<any> {
    const body: AffectationRequest = { id_quartier: idQuartier };
    
    // Pour le moment, simuler une réponse réussie
    return of({ success: true }).pipe(delay(500));
    
    // Lorsque le backend sera prêt, décommenter :
    // return this.http.put(`${this.apiUrl}/agents/${idAgent}/quartier`, body);
  }

  /**
   * Retire l'affectation d'un agent
   */
  retirerAffectation(idAgent: number): Observable<any> {
    // Pour le moment, simuler une réponse réussie
    return of({ success: true }).pipe(delay(500));
    
    // Option 1 : Si le backend accepte null
    // return this.http.put(`${this.apiUrl}/agents/${idAgent}/quartier`, { id_quartier: null });
    
    // Option 2 : Si un endpoint DELETE existe
    // return this.http.delete(`${this.apiUrl}/agents/${idAgent}/quartier`);
  }

  // ========== FAKE DATA METHODS ==========
  
  private getFakeAgents(): Observable<AgentDetailed[]> {
    const fakeAgents: AgentDetailed[] = [
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
    
    return of(fakeAgents);
  }

  private getFakeQuartiers(): Observable<Quartier[]> {
    const fakeQuartiers: Quartier[] = [
      { id_quartier: 1, nom_quartier: 'Centre Ville' },
      { id_quartier: 2, nom_quartier: 'Zone Industrielle' },
      { id_quartier: 3, nom_quartier: 'Quartier Résidentiel Nord' },
      { id_quartier: 4, nom_quartier: 'Quartier Résidentiel Sud' },
      { id_quartier: 5, nom_quartier: 'Zone Commerciale' },
      { id_quartier: 6, nom_quartier: 'Quartier des Affaires' }
    ];
    
    return of(fakeQuartiers);
  }
}