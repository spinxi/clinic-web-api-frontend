import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registered successfully', response);
        // Redirect or handle success
      },
      error => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed';
      }
    );
  }
}