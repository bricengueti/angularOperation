import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../service/message/message.service';

// Mapping des erreurs HTTP vers des messages utilisateur
const ERROR_MESSAGES: Record<number, string> = {
  0: 'Erreur réseau - Veuillez vérifier votre connexion',
  400: 'Requête incorrecte',
  401: 'Authentification requise',
  403: 'Accès non autorisé',
  404: 'Ressource introuvable',
  409: 'Conflit de données',
  500: 'Erreur interne du serveur',
  503: 'Service temporairement indisponible',
};

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Ignorer les erreurs avec le header 'X-Skip-Error-Interceptor'
      if (req.headers.get('X-Skip-Error-Interceptor')) {
        return throwError(() => error);
      }

      const userMessage = getFriendlyErrorMessage(error);
      messageService.showError(userMessage, 7000);

      // Propagation de l'erreur pour un traitement complémentaire
      return throwError(() => error);
    })
  );
};

function getFriendlyErrorMessage(error: HttpErrorResponse): string {
  // 1. Tentative d'extraction du message serveur (si sécurisé)
  if (error.error?.message && typeof error.error.message === 'string') {
    return error.error.message;
  }

  // 2. Utilisation du mapping prédéfini
  if (ERROR_MESSAGES[error.status]) {
    return ERROR_MESSAGES[error.status];
  }

  // 3. Message générique avec code d'erreur
  return `Erreur ${error.status || 'inconnue'} - Veuillez réessayer`;
}


// Flexibilité avancée :

// Mécanisme d'opt-out via header X-Skip-Error-Interceptor

// Conservation de l'erreur originale pour le traitement technique

// Séparation de la logique de mapping dans une fonction dédiée

// Exemple pour ignorer l'intercepteur sur une requête spécifique :

// this.http.get('/api/sensitive', {
//   headers: new HttpHeaders().set('X-Skip-Error-Interceptor', 'true')
// });
