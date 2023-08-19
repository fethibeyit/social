import { Component } from '@angular/core';
import {AuthenticateService} from "../../../core/services/authenticate.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserCredentials} from "../../models/userCredentials.interface";
import {AuthActions} from "../../state/auth-actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticateService,
              private store: Store,
              private router: Router) {
    this.checkJWT();
  }
  submit(credentials:UserCredentials) {
    this.store.dispatch(AuthActions.login({credentials}))

    // this.authService.login(data).subscribe((data) => {
    //   localStorage.setItem('token', data['access-token']);
    //   this.router.navigate(['/posts']);
    // });
  }

  checkJWT() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/anti-heroes'])
    }
  }

}
