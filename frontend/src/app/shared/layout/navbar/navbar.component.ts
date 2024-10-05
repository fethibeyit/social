import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticateService} from "../../../auth/services/authenticate.service";
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

  languages = [
    {value : "en", display : "English"},
    {value : "fr", display : "Français"}
  ];

  selectedLanguage = "en";
  avatarLabel : string | null = null;

  menuItems: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;


  constructor( public authService: AuthenticateService,
               private store: Store,
               private router: Router,
               private translate: TranslateService
  ) {
    this.languages.forEach(l => {
      if (navigator.language.startsWith(l.value)) this.selectedLanguage = l.value;
    })
    this.selectLanguage();
  }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if(profile) this.avatarLabel = profile.fullname.substring(0,1);
    })
    this.menuItems = [
      { icon: 'pi pi-home' , tooltipOptions: { tooltipLabel:'Accueil', tooltipPosition: 'bottom', tooltipStyleClass: "menu-tooltip"}},
      { icon: 'pi pi-users', tooltipOptions: { tooltipLabel:'Amies', tooltipPosition: 'bottom'} },
      { icon: 'pi pi-inbox', tooltipOptions: { tooltipLabel:'Messages', tooltipPosition: 'bottom'} }
    ]

    this.profileItems = [
      {
        label: 'Language',
        icon: 'pi pi-language',
        items: [
          {
            label: 'Français',
            icon : this.selectedLanguage == "fr" ? 'pi pi-check' : '',
            command: () => {
              this.selectedLanguage = "fr";
              this.selectLanguage();
            }
          },
          {
            label: 'English',
            icon : this.selectedLanguage == "en" ? 'pi pi-check' : '',
            command: () => {
              this.selectedLanguage = "en";
              this.selectLanguage();
            }
          }
        ]
      },
      {
        label: 'Logout',
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

  selectLanguage() {
    this.translate.use(this.selectedLanguage);
  }

}
