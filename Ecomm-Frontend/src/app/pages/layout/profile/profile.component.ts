import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  username: string = '';
  email: string = '';
  initials: string = '';
  showLogoutConfirm: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.email = this.authService.getUser()?.email || '';
    this.initials = this.authService.getInitials();
  }

  logout(): void {
    this.showLogoutConfirm = true;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}