import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  cartQuantity: number = 0;

  constructor(
    public authService: AuthService,
    public cartService: CartService // Changed from private to public
  ) {}

  ngOnInit(): void {
    this.updateCartQuantity();
  }

  /**
   * Toggles the mobile menu open/close state
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Logs the user out
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Updates the cart quantity by fetching it from the CartService
   */
  private updateCartQuantity(): void {
    this.cartQuantity = this.cartService.getCartQuantity();
  }
}
