import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoryComponent } from './pages/category/category.component';
import { authGuard } from './auth/auth.guard';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'booking/:doctorId', component: CalendarComponent },
    { path: '**', redirectTo: '/home' },
];
