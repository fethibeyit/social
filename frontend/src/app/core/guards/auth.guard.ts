import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticateService} from "../services/authenticate.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private auth:
    AuthenticateService) {}
  canLoad(route: Route, segments:UrlSegment[]):
    Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      this. router.navigate(['login']);
      return false;
    }
    return true;
  }
}
