import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor-service/doctor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-doctors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-doctors.component.html',
  styleUrl: './home-doctors.component.css'
})
export class HomeDoctorsComponent implements OnInit {
  doctors: any[] = []; 

  constructor(private doctorApiService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  goToDoctorBooking(doctorId: number) {
    console.log("Navigating to booking for doctorId:", doctorId);
    this.router.navigate([`/booking/doctor/${doctorId}`]);
  }
  // Method to fetch the list of doctors
  loadDoctors() {
    this.doctorApiService.getDoctors().subscribe({
      next: (data: any[]) => {
        this.doctors = data; 
        console.log(this.doctors);
      },
      error: (error: any) => {
        console.error('Error loading doctors:', error);
      }
    });
  }
}