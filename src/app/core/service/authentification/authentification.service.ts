import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private readonly AUTH_API = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  this.currentUserSubject = new BehaviorSubject<any>(initialUser);
  this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.AUTH_API}/login`, { username, password }, { headers })
      .pipe(
        map(user => {
          // Store user details and jwt token in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // Remove user from local storage dand set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

 register(user: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.AUTH_API}/register`, user, { headers })
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  // getToken(): string {
  //   const currentUser = this.currentUserValue;
  //   return currentUser?.token;
  // }

  getToken(): string {
  const currentUser = this.currentUserValue;
  return currentUser?.accessToken; // Changé de 'token' à 'accessToken'
}

  refreshToken(): Observable<any> {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.refreshToken) {
      return this.http.post(`${this.AUTH_API}/refresh-token`, {
        refreshToken: currentUser.refreshToken
      }).pipe(
        tap((tokens: any) => {
          // Update stored tokens
          const updatedUser = { ...currentUser, token: tokens.token };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        })
      );
    }
    return of(null);
  }
}
