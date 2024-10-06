import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {AuthState} from "./auth/state/auth-state";
import {ProfileModel} from "./auth/models/profileModel.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Social App';

  isAuthenticated :boolean = false
  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;

  constructor(translate: TranslateService) {
    const language = localStorage.getItem('language') ?? 'en';
    translate.setDefaultLang('en');
    translate.use(language);
  }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      this.isAuthenticated = profile != null && profile.fullname != "";
    });
  }

}
