import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private authService:AuthService,
    private router:Router
  ){

  }

  opened = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 768) {
      this.opened = false;  // Hide the drawer on small screens by default
    } else {
      this.opened = true;  // Show the drawer on larger screens
    }
  }

  toggle() {
    this.opened = !this.opened
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
