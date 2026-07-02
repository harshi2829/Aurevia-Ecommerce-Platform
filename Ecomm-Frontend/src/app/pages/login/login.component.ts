import { Component } from '@angular/core';
import { LogData } from '../../models/userLog.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  myLogObj:LogData=new LogData();

  constructor(private service:AuthService,private router:Router){}
  
  toastMessage = '';
toastType: 'success' | 'error' | '' = '';
showToast = false;

showToastMsg(message: string, type: 'success' | 'error') {
  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000);
}


  onLog() {
  this.service.onLog(this.myLogObj).subscribe(
    (data: any) => {
      console.log(data);

      if (data.success) {
        this.showToastMsg("Login Successful", "success");

        // Store actual user object, not the string
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          email: data.email,
          id:data.id
        }));

        setTimeout(() => {
          this.router.navigateByUrl('layout/home');
        }, 1000);

      } else {
        // Shows "User Not Found" or "Invalid Password" from backend
        this.showToastMsg(data.message, "error");
      }
    },
    error => {
      this.showToastMsg("Invalid Credentials", "error");
    }
  );
}

}