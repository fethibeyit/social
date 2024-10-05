import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {AuthenticateService} from "./auth/services/authenticate.service";
import {Observable} from "rxjs";
import {AuthState} from "./auth/state/auth-state";
import {ProfileModel} from "./auth/models/profileModel.interface";
import {Auth} from "./auth/state/auth-actions";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Social App';

  isAuthenticated :boolean = false
  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;

  constructor(translate: TranslateService, private store: Store ,private authService : AuthenticateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      this.isAuthenticated = profile != null;
    })
    if(this.authService.isAuthenticated()) console.log("auth");
    this.store.dispatch(new Auth.SetStorageToken());
    this.store.dispatch(new Auth.GetProfile()).subscribe(() =>
      console.log('prooooo'));
  }

}
