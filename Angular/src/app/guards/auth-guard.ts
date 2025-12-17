import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      const requiredRole = route.data['role'];
      
      if (requiredRole && userRole !== requiredRole) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      return true;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}