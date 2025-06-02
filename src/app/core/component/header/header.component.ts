import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  notificationCount: number = 3; // Exemple de notifications

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;

    // Recherche en temps réel (debounced)
    if (this.searchQuery.length > 2) {
      this.performSearch();
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Ici vous ajouteriez votre logique de recherche
      // this.searchService.search(this.searchQuery).subscribe(...)
    }
  }

  toggleNotifications() {
    console.log('Notifications clicked');
    // Ici vous ajouteriez votre logique pour afficher les notifications
    // this.notificationService.togglePanel();
  }
}
