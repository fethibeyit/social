import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> |
    Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean |
    UrlTree> | Promise<boolean | UrlTree> | boolean |
    UrlTree {
    return component.canDeactivate ?
      component.canDeactivate() : true;
  }
}
