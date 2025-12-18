import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
  idQuartier: number;
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

 
  getAgents(page: number = 0, size: number = 10): Observable<PageResponse<Agent>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    const headers = this.getHeaders();
    
    return this.http.get<PageResponse<Agent>>(`${this.apiUrl}/agents`, { 
      params,
      headers 
    });
  }

 
  getAgentsContent(page: number = 0, size: number = 10): Observable<Agent[]> {
    return this.getAgents(page, size).pipe(
      map(response => response.content)
    );
  }

  getQuartiers(): Observable<Quartier[]> {
    const headers = this.getHeaders();
    
    return this.http.get<Quartier[]>(`${this.apiUrl}/quartiers`, { 
      headers 
    });
  }

 
  affecterQuartier(idAgent: number, idQuartier: number): Observable<Agent> {
    const body: AffectationRequest = { idQuartier };
    const headers = this.getHeaders();
    
    return this.http.put<Agent>(
      `${this.apiUrl}/agents/${idAgent}/quartier`, 
      body,
      { headers }
    );
  }
}