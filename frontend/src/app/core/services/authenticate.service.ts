import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(data: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/auth`, data).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  register(data: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/register`, data).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    return !this.jwtHelper.isTokenExpired(token);
  }
}
