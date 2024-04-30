import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @ViewChild('childModal') childComponent!: LoginModalComponent;
  constructor(private authService: AuthService) {}

  isAuthenticated(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  currentUser = this.authService.getCurrentUser();

  toggleModal(): void {
    this.childComponent.toggleModal();
  }

}
