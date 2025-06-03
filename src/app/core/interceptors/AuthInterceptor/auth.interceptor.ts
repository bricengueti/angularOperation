import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentification/authentification.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  // Récupère le token (en utilisant accessToken qui est le nom dans la réponse)
  const token = authService.currentUserValue?.accessToken;

  console.log('Token dans l\'intercepteur :', token);

  // Si le token existe et que la requête n'est pas vers l'API d'authentification
  if (token && !req.url.includes('/auth/')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
