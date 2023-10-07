import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthenticateService} from "../../../auth/services/authenticate.service";
import {Select, Store} from "@ngxs/store";
import {Auth} from "../../../auth/state/auth-actions";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/state/auth-state";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Select(AuthState.profile) profile$!: Observable<string> ;

  languages = [
    {value : "en", display : "English"},
    {value : "fr", display : "Français"}
  ];

  selectedLanguage = "en";

  constructor( public authService: AuthenticateService,
               private store: Store,
               private router: Router,
               private translate: TranslateService
  ) {
    this.languages.forEach(l => {
      if (navigator.language.startsWith(l.value)) this.selectedLanguage = l.value;
    })
    this.translate.use(this.selectedLanguage);
  }

  logout() {
    this.store.dispatch(new Auth.Logout()).subscribe(() => this.router.navigate(['/login']))
  }

  selectLanguage() {
    this.translate.use(this.selectedLanguage);
  }


}
