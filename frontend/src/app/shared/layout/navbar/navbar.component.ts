import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthenticateService} from "../../../core/services/authenticate.service";
import {Store} from "@ngxs/store";
import {Auth} from "../../../auth/state/auth-actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor( public authService: AuthenticateService,
              private store: Store,
              private router: Router
  ) {}



  logout() {
    this.store.dispatch(new Auth.Logout()).subscribe(() => this.router.navigate(['/login']))
  }

}
