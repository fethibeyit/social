import { Component } from '@angular/core';
import {AuthenticateService} from "../../../core/services/authenticate.service";
import {Router} from "@angular/router";
import {UserCredentials} from "../../models/userCredentials.interface";
import {Select, Store} from "@ngxs/store";
import {Auth} from "../../state/auth-actions";
import { Location } from '@angular/common';
import {PostState} from "../../../post/state/post-state";
import {Observable} from "rxjs";
import {PostModel} from "../../../post/models/postModel.interface";
import {AuthState} from "../../state/auth-state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Select(AuthState.loading) loading$!: Observable<boolean>;
  @Select(AuthState.error) error$!: Observable<string | null>;

  constructor(private authService: AuthenticateService,
              private store: Store,
              private router: Router,
              private location : Location) {
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
