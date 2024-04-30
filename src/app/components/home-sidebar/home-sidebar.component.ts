import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from '../../services/api-service/category-api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-sidebar.component.html',
  styleUrl: './home-sidebar.component.css'
})
export class HomeSidebarComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryApiService: CategoryApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryApiService.getCategoriesWithDoctorCounts().subscribe({
      next: (categories: any[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}