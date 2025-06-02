import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeRoute: string = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    // Déterminer la route active basée sur l'URL actuelle
    this.setActiveRouteFromUrl();
  }

  setActiveRoute(route: string) {
    this.activeRoute = route;
    // Navigation vers la route correspondante
    this.router.navigate([`/${route}`]);
  }

  private setActiveRouteFromUrl() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/home')) {
      this.activeRoute = 'home';
    } else if (currentUrl.includes('/course')) {
      this.activeRoute = 'course';
    } else if (currentUrl.includes('/students')) {
      this.activeRoute = 'students';
    } else if (currentUrl.includes('/payment')) {
      this.activeRoute = 'payment';
    } else if (currentUrl.includes('/report')) {
      this.activeRoute = 'report';
    } else if (currentUrl.includes('/settings')) {
      this.activeRoute = 'settings';
    } else {
      this.activeRoute = 'home';
    }
  }

  logout() {
    // Logique de déconnexion
    console.log('Logout clicked');

    // Supprimer les tokens/données de session
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
