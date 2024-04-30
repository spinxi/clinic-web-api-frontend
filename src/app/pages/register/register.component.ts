import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
// import { ToastrService } from 'ngx-toastr'; // For toasts
import { CommonModule } from '@angular/common';
import { NotifyService } from '../../services/notify/notify.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  registrationForm: FormGroup = new FormGroup({}); // Form group to manage form controls
  confirmationMessage: string = '';
  backendUrl = environment.apiUrl;
  StrongPasswordRegx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; //for password
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.StrongPasswordRegx)]]
    });
  }
  

  // constructor(private authService: AuthService) { };

  onSubmitRegistration() {
    if (this.registrationForm.valid) {
      // Form is valid, register user
      this.authService.register(this.registrationForm.value)
        .subscribe({
          next: () => {
            console.log('Registration successful');
            this.notify.successToast('რეგისტრაცია წარმატებულია. ელ.ფოსტაზე გამოგზავნილია შეტყობინება');
            this.clearFormData();
            this.confirmationMessage = "ელ.ფოსტაზე გამოგზავნილია შეტყობინება";

          },
          error: (error) => {
            console.error('Registration failed:', error);
            if (error && error.error && Array.isArray(error.error)) {
              const errorMessages = error.error.map((err: any) => err.description);
              this.notify.errorToast(errorMessages.join('<br>'));
            } else {
              this.notify.errorToast('Something went wrong. Please try again.');
            }
          }
        });
    }else {
      this.notify.errorToast('Please fill all required fields with valid data.');
    }
  }
  



  resendConfirmationEmail() {
    const emailControl = this.registrationForm.get('email');

    if (emailControl === null || emailControl === undefined || !emailControl.value) {
      this.confirmationMessage = 'Please enter your email address.';
      return;
    }

    const email = emailControl.value;
  
    this.http.post(`${this.backendUrl}/api/Account/resendConfirmationEmail`, { email: email })
      .subscribe({
        next: () => {
          this.confirmationMessage = "ელ. ფოსტაზე გამოგზავნილია შეტყობინება";
          this.clearFormData();
          this.notify.successToast('Confirmation email resent successfully. Please check your email for confirmation.');
        },
        error: (error: any) => { // Specify the type of 'error'
          console.error('Failed to resend confirmation email:', error);
        }
      });
  }
  

  clearFormData() {
    Object.keys(this.registrationForm.controls).forEach(controlName => {
      if (controlName !== 'email') {
        this.registrationForm.get(controlName)?.setValue('');
      }
    });
  }


}
