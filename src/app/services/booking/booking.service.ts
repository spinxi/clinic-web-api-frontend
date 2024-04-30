import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/api/booking`, booking);
  }

  getBookingsByDoctor(doctorId: number): Observable<Booking[]> {
    console.log(this.http.get<Booking[]>(`${this.apiUrl}/api/Booking/doctor/${doctorId}`));
    return this.http.get<Booking[]>(`${this.apiUrl}/api/Booking/doctor/${doctorId}`);
  }
}
export interface Booking {
  bookingId?: number;
  userId?: string;
  doctorId: number;
  dateTime: Date;
  description: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}