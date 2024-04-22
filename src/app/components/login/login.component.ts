import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Logged in successfully', response);
        this.authService.setLoggedIn(true);
        // Redirect or handle success
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}