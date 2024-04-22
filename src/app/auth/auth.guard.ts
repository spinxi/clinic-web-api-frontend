// src/app/auth/auth.guard.ts
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if (this.authService.isAuthenticated()) {
        return true;
     } else {
        this.router.navigate(["/login"]);
        return false;
     }
  }
}