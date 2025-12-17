import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginReply {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginReply> {
    return this.http.post<LoginReply>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRole(response.role);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
