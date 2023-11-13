import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Social App';

  constructor(translate: TranslateService, private store: Store) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

}
