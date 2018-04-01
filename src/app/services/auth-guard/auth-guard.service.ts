import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    if  ( this.authService.isLoggedIn() ) {

      return true;

    }

    this.router.navigate(['/']);
    return false;
  }

}
