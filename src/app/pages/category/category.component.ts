import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryApiService } from '../../services/api-service/category-api.service';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(private apiService: CategoryApiService) { }

  ngOnInit(): void {
    this.getCategoriesWithDoctorCounts();
  }

  getCategoriesWithDoctorCounts(): void {
    this.apiService.getCategoriesWithDoctorCounts().subscribe(
      (response: any[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  deleteCategory(categoryId: number): void {
    // Implement delete logic here
    // Send delete request to your API
  }

  editCategory(categoryId: number): void {
    // Implement edit logic here
  }

  addCategory(): void {
    // Implement add logic here
  }
}