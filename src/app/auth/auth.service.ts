import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { LocalStorageService } from '../services/local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
}) 
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,private localStorage: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Check if user is logged in when the service initializes
    this.checkLoggedInStatus();
    
  }

  private checkLoggedInStatus(): void {
    if (typeof this.localStorage !== 'undefined') {
      const token = this.localStorage.getItem(this.tokenKey);
      if (token) {
        this.loadCurrentUser();
      }
    } else {
      console.log('No localStorage support');
    }
  }

  public register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Account/register`, data);
  }

  login(data: LoginRequest): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      map((response: AuthResponse) => {
        if (response && response.accessToken) {
          this.localStorage.setItem(this.tokenKey, response.accessToken);
          this.loggedIn.next(true);
          this.loadCurrentUser();
          return true;
        } else {
          this.localStorage.removeItem(this.tokenKey);
          this.loggedIn.next(false);
          return false;
        }
      })
    );
  }
  

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public loadCurrentUser(): void {
    const token = this.localStorage.getItem(this.tokenKey);
    if (!token) {
      console.error('No token found.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http
      .get<any>(`${this.apiUrl}/api/Account/userinfo`, { headers })
      .pipe(
        tap(user => this.currentUserSubject.next(user)),
        catchError(error => {
          console.error('Error fetching current user:', error);
          this.localStorage.removeItem(this.tokenKey);
          this.localStorage.removeItem('refreshToken');
          this.loggedIn.next(false);
          this.currentUserSubject.next(null);
          throw error;
        })
      )
      .subscribe();
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  logout = (): void => {
    this.localStorage.removeItem(this.tokenKey);
    this.localStorage.removeItem('refreshToken');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  };

  getToken = (): string | null => {
    return this.localStorage.getItem(this.tokenKey) || null;
  };
}
