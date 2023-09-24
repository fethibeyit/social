import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticateService} from "../../auth/services/authenticate.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthenticateService,
    private location:Location
  ) {}
  canLoad(route: Route, segments:UrlSegment[]):
    Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.authService.redirectUrl = this.location.path(true);
      this. router.navigate(['login']);
      return false;
    }
    return true;
  }
}
