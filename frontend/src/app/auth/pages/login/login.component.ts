import { Component } from '@angular/core';
import {AuthenticateService} from "../../../core/services/authenticate.service";
import {Router} from "@angular/router";
import {UserCredentials} from "../../models/userCredentials.interface";
import {Store} from "@ngxs/store";
import {Auth} from "../../state/auth-actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private authService: AuthenticateService,
              private store: Store,
              private router: Router
              ) {
    this.checkJWT();
  }

  submit(credentials:UserCredentials) {
    this.store.dispatch(new Auth.Login(credentials)).subscribe(()=> {
      if(this.authService.isAuthenticated()) {
        const redirectUrl = this.authService.redirectUrl || '/';
        this.authService.redirectUrl = null;
        this.router.navigateByUrl(redirectUrl)
      }
    })
  }

  checkJWT() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

}
