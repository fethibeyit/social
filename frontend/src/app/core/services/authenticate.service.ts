import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserCredentials} from "../../auth/models/userCredentials.interface";
import {AppUserCreateModel} from "../../auth/models/appUserCreateModel.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public redirectUrl : string | null = null;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,) {
  }

  login(data: UserCredentials): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/auth`, data).pipe(
      delay(2000),
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  register(user: AppUserCreateModel): Observable<any> {
    console.log("service", user)
    return this.http.post<any>(`${environment.authURL}/register`, user).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth.token') ?? '';
    try{
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}
