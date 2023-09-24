import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthenticateService} from "../../../auth/services/authenticate.service";
import {Select, Store} from "@ngxs/store";
import {Auth} from "../../../auth/state/auth-actions";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/state/auth-state";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Select(AuthState.profile) profile$!: Observable<string> ;

  constructor( public authService: AuthenticateService,
              private store: Store,
              private router: Router
  ) {}



  logout() {
    this.store.dispatch(new Auth.Logout()).subscribe(() => this.router.navigate(['/login']))
  }

}
