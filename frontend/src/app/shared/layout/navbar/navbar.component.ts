import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticateService} from "../../../auth/services/authenticate.service";
import {Select, Store} from "@ngxs/store";
import {Auth} from "../../../auth/state/auth-actions";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/state/auth-state";
import {TranslateService} from "@ngx-translate/core";
import {ProfileModel} from "../../../auth/models/profileModel.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;

  languages = [
    {value : "en", display : "English"},
    {value : "fr", display : "Français"}
  ];

  selectedLanguage = "en";
  avatarLabel : string | null = null;


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

  ngOnInit(): void {
    this.store.dispatch(new Auth.GetProfile());
    this.profile$.subscribe(profile => {
      if(profile) this.avatarLabel = profile.fullname.substring(0,1);
    })
  }

  logout() {
    this.store.dispatch(new Auth.Logout()).subscribe(() => this.router.navigate(['/login']))
  }

  selectLanguage() {
    this.translate.use(this.selectedLanguage);
  }

}
