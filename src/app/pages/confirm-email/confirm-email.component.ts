import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})


export class ConfirmEmailComponent implements OnInit {
  private userId!: string;
  private code!: string;
  confirmationMessage: string = '';
  backendUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const { userId, code } = this.route.snapshot.queryParams;
    if (userId && code) {
      this.userId = userId;
      this.code = code;
      this.confirmEmail();
    } else {
      console.error('Missing userId or code in query params');
    }
  }

  confirmEmail(): void {
    const apiUrl = `${this.backendUrl}/api/Account/confirmEmail?userId=${this.userId}&code=${this.code}`;
    fetch(apiUrl)
      .then(response => response.ok ?
        (this.confirmationMessage = 'ანგარიში წარმატებით გააქტიურდა. გაიარეთ ავტორიზაცია') :
        (this.confirmationMessage = 'ანგარიშის გააქტიურება ვერ მოხერხდა. სცადეთ მოგვიანებით')
      )
      .catch(() => this.confirmationMessage = 'ანგარიშის გააქტიურება ვერ მოხერხდა. სცადეთ მოგვიანებით');
  }
  
  

  
}