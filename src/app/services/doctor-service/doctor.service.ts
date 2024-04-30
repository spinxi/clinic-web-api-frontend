import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Get all doctors
  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Doctor`);
  }

  // Get doctor by ID
  getDoctor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Doctor/${id}`);
  }

  // Add a new doctor
  addDoctor(userRegistration: any, categoryId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/api/Doctor`, { userRegistration, categoryId }, { headers });
  }

  // Update doctor
  updateDoctor(id: number, doctor: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/api/Doctor/${id}`, doctor, { headers });
  }

  // Delete doctor
  deleteDoctor(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/Doctor/${id}`, { headers });
  }

  // Private method to get HTTP headers
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}