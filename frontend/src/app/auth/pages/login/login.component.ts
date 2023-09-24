import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserCredentials} from "../../models/userCredentials.interface";
import {Store} from "@ngxs/store";
import {Auth} from "../../state/auth-actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthenticateService,
              private store: Store,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.checkJWT();
  }

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    const error: string | null = this.route.snapshot.queryParamMap.get('error');
    if (token) {
      console.log("token", token)
      this.store.dispatch(new Auth.SetToken(token)).subscribe(() => {
        if (this.authService.isAuthenticated()) {
          this.store.dispatch(new Auth.GetProfile());
          const redirectUrl = this.authService.redirectUrl || '/';
          this.authService.redirectUrl = null;
          this.router.navigateByUrl(redirectUrl)
        }
      });
    } else if (error) {
      console.log("error", error)
    }
  }


  submit(credentials: UserCredentials) {
    this.store.dispatch(new Auth.Login(credentials)).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        this.store.dispatch(new Auth.GetProfile());
        const redirectUrl = this.authService.redirectUrl || '/';
        this.authService.redirectUrl = null;
        this.router.navigateByUrl(redirectUrl)
      }
    });
  }

  checkJWT() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

}

