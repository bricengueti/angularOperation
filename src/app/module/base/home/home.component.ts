import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../core/component/sidebar/sidebar.component';
import { HeaderComponent } from '../../../core/component/header/header.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats = {
    students: 243,
    courses: 13,
    payments: 556000,
    users: 3
  };

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Ici vous chargeriez les vraies données depuis votre API
    // this.dashboardService.getStats().subscribe(data => {
    //   this.stats = data;
    // });
  }

  addStudent() {
    console.log('Add student clicked');
    // Navigation vers la page d'ajout d'étudiant
    // this.router.navigate(['/students/add']);
  }

  createCourse() {
    console.log('Create course clicked');
    // Navigation vers la page de création de cours
    // this.router.navigate(['/courses/create']);
  }

  viewReports() {
    console.log('View reports clicked');
    // Navigation vers la page des rapports
    // this.router.navigate(['/reports']);
  }

  openSettings() {
    console.log('Settings clicked');
    // Navigation vers la page des paramètres
    // this.router.navigate(['/settings']);
  }
}
