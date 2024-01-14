import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {AppUserModel} from "../models/appUserModel.interface";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

  getAppUsers(): Observable<AppUserModel[]> {
    return this.http.get<AppUserModel[]>(`${environment.apiURL}/appUsers`).pipe(
      tap((data: AppUserModel[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateAppUser(appUser : AppUserModel): Observable<AppUserModel>{
    return this.http.put<AppUserModel>(`${environment.apiURL}/appUsers/${appUser.id}` , appUser).pipe(
      tap((data: AppUserModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  deleteAppUser(AppUserId: string) {
    return this.http.delete<any>(`${environment.apiURL}/appUsers/${AppUserId}`).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

}
