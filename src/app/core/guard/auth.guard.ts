import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/authentification/authentification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirige vers la page de login avec l'URL de retour
  router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
