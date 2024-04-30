
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loadCurrentUser();
    this.authService.isLoggedIn();
    if(this.authService.isLoggedIn()){
      this.authService.getCurrentUser().subscribe(user => {
        this.userInfo = user;
        console.log(this.userInfo);
      });
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}  