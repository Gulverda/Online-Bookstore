import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home Page
  { path: 'book/:id', component: BookDetailsComponent }, // Book Details Page
  { path: 'auth', component: AuthComponent }, // Authorization Page
  { path: 'cart', component: CartComponent }, // Cart/Profile Page
];
