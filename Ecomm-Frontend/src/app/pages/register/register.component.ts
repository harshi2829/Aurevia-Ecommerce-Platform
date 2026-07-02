import { Component } from '@angular/core';
import { RegData } from '../../models/userReg.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';
  showToast = false;

  // Validation errors
  usernameError = '';
  emailError = '';
  passwordError = '';

  myRegObj: RegData = new RegData();

  constructor(private service: AuthService, private router: Router) {}

  showToastMsg(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  validate(): boolean {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';

    let isValid = true;

    // Username validation
    if (!this.myRegObj.username) {
      this.usernameError = 'Username is required!';
      isValid = false;
    } else if (this.myRegObj.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters!';
      isValid = false;
    } else if (this.myRegObj.username.length > 20) {
      this.usernameError = 'Username must be less than 20 characters!';
      isValid = false;
    } else if (this.myRegObj.username.includes(' ')) {
      this.usernameError = 'Username cannot contain spaces!';
      isValid = false;
    }

    // Email validation
    if (!this.myRegObj.email) {
      this.emailError = 'Email is required!';
      isValid = false;
    } else if (!this.myRegObj.email.includes('@')) {
      this.emailError = 'Please enter a valid email!';
      isValid = false;
    }

    // Password validation
    if (!this.myRegObj.password) {
      this.passwordError = 'Password is required!';
      isValid = false;
    } else if (this.myRegObj.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters!';
      isValid = false;
    } else if (this.myRegObj.password.length > 30) {
      this.passwordError = 'Password must be less than 30 characters!';
      isValid = false;
    }

    return isValid;
  }

  onReg() {
    if (!this.validate()) {
      return;  // stop if validation fails!
    }

    this.service.onReg(this.myRegObj).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data === "Registered Successfully") {
          this.showToastMsg("User Registered Successfully!", "success");
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1500);
        } else {
          this.showToastMsg(data, "error");
        }
      },
      error: () => {
        this.showToastMsg("Something went wrong! Try again.", "error");
      }
    });
  }
}