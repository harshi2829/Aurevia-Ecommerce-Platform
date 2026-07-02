import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service=inject(AuthService)
  const router=inject(Router)
  if(service.isLogIn())
  {
    return true;
  }
  else{
    alert("Please Login First");
    router.navigateByUrl('/login');
  return false;
  }
};
