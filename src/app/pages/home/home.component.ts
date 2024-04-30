import { Component } from '@angular/core';
import { HeaderBannerComponent } from '../../components/header-banner/header-banner.component';
import { HomeSidebarComponent } from '../../components/home-sidebar/home-sidebar.component';
import { HomeDoctorsComponent } from '../../components/home-doctors/home-doctors.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderBannerComponent, HomeDoctorsComponent, HomeSidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
