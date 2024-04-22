import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'YOUR_API_URL';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  logout() {
    // Implement logout logic
  }
}
