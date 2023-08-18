import { Component } from '@angular/core';
import {AuthenticateService} from "../../../core/services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticateService,
              private router: Router) {
    this.checkJWT();
  }
  submit(data:{username:string, password:string}) {
    this.authService.login(data).subscribe((data) => {
      localStorage.setItem('token', data['access-token']);
      this.router.navigate(['/posts']);
    });
  }

  checkJWT() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/anti-heroes'])
    }
  }

}
