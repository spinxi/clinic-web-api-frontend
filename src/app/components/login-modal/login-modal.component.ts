import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NotifyService } from '../../services/notify/notify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  showModal: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private notify: NotifyService,
    private router: Router
  ) 
    {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.notify.successToast("ავტორიზაცია წარმატებულია");
          this.toggleModal();
          this.router.navigate(['home']);
        } else {
          this.notify.errorToast("ავტორიზაცია წარუმატებელია");
        }
      });
    } else {
      this.notify.errorToast("გთხოვთ შეავსოთ ყველა ველი");
    }
  }

  currentUser: any;
  
  // ngOnInit(): void {
  //   this.authService.getCurrentUser().subscribe(
  //     (user) => {
  //       this.currentUser = user;
  //       console.error('Error fetching current user:', this.currentUser);
  //     },
  //     (error) => {
  //       console.error('Error fetching current user:', error);
  //     }
  //   );
  // }



  toggleModal() {
    this.showModal = !this.showModal;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.showModal = false;
    }
  }
}
