import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum CompteurType {
  EAU = 'EAU',
  ELECTRICITE = 'ELECTRICITE',
  GAZ = 'GAZ'
}

export interface Releve {
  labelClient: string;
  typeCompteur: CompteurType;
  adresse: string;
  consommation: number;
  dateReleve: string;
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
export class ReleveService {
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

  getReleves(page: number = 0, size: number = 10): Observable<PageResponse<Releve>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    const headers = this.getHeaders();
    
    return this.http.get<PageResponse<Releve>>(`${this.apiUrl}/releves`, { 
      params,
      headers 
    });
  }

  
  getAllReleves(): Observable<Releve[]> {
    const headers = this.getHeaders();
    
    return this.http.get<Releve[]>(`${this.apiUrl}/releves`, { 
      headers 
    });
  }
}