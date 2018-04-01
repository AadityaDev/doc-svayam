import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  constructor(private authService: AuthService, private router: Router) {
  }


   signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          let navigationExtras: NavigationExtras = {
            queryParams: {
                "uid": res['user']['uid'],
                "res": res
            }
          };
          this.router.navigate(['dashboard'],navigationExtras)
        })
      .catch((err) => console.log(err));
    }


    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }



  ngOnInit() {
  }

}
