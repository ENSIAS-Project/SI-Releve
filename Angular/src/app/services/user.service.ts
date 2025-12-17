import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Roles {
  ROLE_SUPERADMIN = 'ROLE_SUPERADMIN',
  ROLE_UTILISATEUR = 'ROLE_UTILISATEUR'
}

export interface UserCreateDto {
  nom: string;
  prenom: string;
  email: string;
  roles: Roles; 
}

export interface UserUpdateDto {
  idUser: number;
  nom: string;
  prenom: string;
  email: string;
  roles: Roles; 
}

export interface UserResponseDto {
  idUser: number;
  nom: string;
  prenom: string;
  email: string;
  roles: Roles; 
  dateCreation: string;
  dateModification: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getAllUsers(page: number = 0, size: number = 10, sort: string = 'nom,asc'): Observable<PageResponse<UserResponseDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<PageResponse<UserResponseDto>>(this.apiUrl, { params });
  }


  addUser(user: UserCreateDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.apiUrl}/add`, user);
  }

  
  updateUser(user: UserUpdateDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.apiUrl}/update`, user);
  }

 
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}