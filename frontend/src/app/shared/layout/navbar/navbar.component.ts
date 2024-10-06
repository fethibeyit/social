import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Auth} from "../../../auth/state/auth-actions";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/state/auth-state";
import {TranslateService} from "@ngx-translate/core";
import {ProfileModel} from "../../../auth/models/profileModel.interface";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;

  selectedLanguage = 'en';

  menuItems: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;


  constructor( private store: Store,
               private router: Router,
               private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') ?? 'en';

    this.menuItems = [
      { icon: 'pi pi-home' , tooltipOptions: { tooltipLabel:'Accueil', tooltipPosition: 'bottom', tooltipStyleClass: "menu-tooltip"}},
      { icon: 'pi pi-users', tooltipOptions: { tooltipLabel:'Amies', tooltipPosition: 'bottom'} },
      { icon: 'pi pi-inbox', tooltipOptions: { tooltipLabel:'Messages', tooltipPosition: 'bottom'} }
    ]

    this.profileItems = [
      {
        label: this.translate.instant('Language'),
        root: true,
        icon: 'pi pi-language',
        items: [
          {
            label: this.selectedLanguage == 'fr' ?  '<strong>Français<strong>': 'Français',
            escape: false,
            command: () => {
              this.selectLanguage('fr');
            }
          },
          {
            label: this.selectedLanguage == 'en' ?  '<strong>English<strong>': 'English',
            escape: false,
            command: () => {
              this.selectLanguage('en');
            }
          }
        ]
      },
      {
        label:  this.translate.instant('Logout'),
        root : true,
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  logout() {
    this.store.dispatch(new Auth.Logout()).subscribe(() => this.router.navigate(['/login']))
  }

  selectLanguage(language: string) {
    localStorage.setItem('language', language) ;
    location.reload();
  }

}
