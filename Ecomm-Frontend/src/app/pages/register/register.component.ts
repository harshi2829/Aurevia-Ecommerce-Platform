import { Component } from '@angular/core';
import { RegData } from '../../models/userReg.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

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




  myRegObj:RegData=new RegData();

  constructor(private service:AuthService,private router:Router){}

  onReg()
  {
    this.service.onReg(this.myRegObj).subscribe({
      next:(data:any)=>
    {
      console.log(data);

      if(data==="Registered Successfully")
      {
        this.showToastMsg("User Registered Successfully", "success");
       this.router.navigateByUrl('/login');
      }

      else{
        alert(data);
      }
    },
      error:()=>
      {
        alert("Something Went Wrong Try Again");
      }
    });
  }
}
