import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : any{
    let autenticado = this.authService.isAuthenticated();

    console.log(autenticado)

    if (!localStorage.getItem("primeiroacesso")) {
      this.router.navigate(['/slide']);
      return false;
    }

    if(state.url === '/login' && autenticado) {
      this.router.navigate(['/home/destaques']);
      return false;
    }

    if (state.url == '/login' && !autenticado) {
      return true;
    }

    return autenticado;
  }
}