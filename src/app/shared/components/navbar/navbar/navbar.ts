import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalConstant } from '../../../../core/constants/global.constant';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private routeAuth = GlobalConstant.API_END_POINT_CONTROLLER.AUTH;
  private routeLogin = GlobalConstant.API_END_POINT_CONTROLLER.LOGIN;

  isUserMenuOpen = false;

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click')
  closeMenu() {
    this.isUserMenuOpen = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate([`/${this.routeAuth}/${this.routeLogin}`]);
  }
}
