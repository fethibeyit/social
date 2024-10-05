import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserCredentials} from "../models/userCredentials.interface";
import {AppUserCreateModel} from "../models/appUserCreateModel.interface";
import {ProfileModel} from "../models/profileModel.interface";

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
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${environment.authURL}/profile`).pipe(
      tap((data: ProfileModel) =>  data),
      catchError(err => throwError(() => err))
    )
  }

  register(user: AppUserCreateModel): Observable<any> {
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

  getToken() : string {
    return localStorage.getItem('auth.token') ?? '';
  }

}
