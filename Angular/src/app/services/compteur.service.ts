import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum CompteurType {
  EAU = 'EAU',
  ELECTRICITE = 'ELECTRICITE',
  GAZ = 'GAZ'
}

export interface Client {
  id_client: number;
  label_client: string;
}

export interface CompteurResponse {
  id_compteur: number;
  label_client: string;
  adresse: string;
  type_compteur: CompteurType;
}

export interface CreateCompteurRequest {
  id_client: number;
  adresse: string;
  type_compteur: CompteurType;
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
export class CompteurService {
  private apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Récupère tous les compteurs sans pagination
   */
  getAllCompteurs(): Observable<CompteurResponse[]> {
    const headers = this.getHeaders();
    
    return this.http.get<any>(`${this.apiUrl}/compteurs`, { 
      headers 
    }).pipe(
      // Transformer la réponse pour gérer les deux formats possibles
      map((response: any) => {
        console.log('📦 Réponse brute du backend:', response);
        console.log('📦 Type:', typeof response);
        console.log('📦 Is Array?', Array.isArray(response));
        
        // Si c'est un array direct
        if (Array.isArray(response)) {
          console.log('✅ Réponse est un array');
          return response;
        }
        
        // Si c'est une Page (avec content, totalElements, etc)
        if (response.content && Array.isArray(response.content)) {
          console.log('✅ Réponse est une Page avec content');
          return response.content;
        }
        
        // Sinon retourner un array vide
        console.warn('⚠️ Format de réponse inconnu, retour array vide');
        return [];
      })
    );
  }

  /**
   * Récupère les compteurs avec pagination
   */
  getCompteurs(page: number = 0, size: number = 10, sort: string = 'idCompteur,asc'): Observable<PageResponse<CompteurResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    
    const headers = this.getHeaders();
    
    return this.http.get<PageResponse<CompteurResponse>>(`${this.apiUrl}/compteurs`, { 
      params,
      headers 
    });
  }

  /**
   * Crée un nouveau compteur
   */
  createCompteur(request: CreateCompteurRequest): Observable<CompteurResponse> {
    const headers = this.getHeaders();
    
    return this.http.post<CompteurResponse>(
      `${this.apiUrl}/compteurs`,
      request,
      { headers }
    );
  }

  /**
   * Supprime un compteur
   */
  deleteCompteur(idCompteur: number): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.delete(
      `${this.apiUrl}/compteurs/${idCompteur}`,
      { headers }
    );
  }

  /**
   * Récupère tous les clients
   */
  getAllClients(): Observable<Client[]> {
    const headers = this.getHeaders();
    
    return this.http.get<Client[]>(`${this.apiUrl}/clients`, { 
      headers 
    });
  }
}