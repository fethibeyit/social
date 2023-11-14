import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {LikeModel} from "../models/likeModel.interface";
import {LikeCreateModel} from "../models/likeCreateModel.interface";
import {PostModel} from "../../post/models/postModel.interface";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  createLike(like : LikeCreateModel): Observable<LikeModel>{
    return this.http.post<LikeModel>(`${environment.apiURL}/likes`, like).pipe(
      tap((data: LikeModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateLike(like : LikeModel): Observable<LikeModel>{
    return this.http.put<LikeModel>(`${environment.apiURL}/likes/${like.id}` , like).pipe(
      tap((data: LikeModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  deleteLike(LikeId: string) {
    return this.http.delete<any>(`${environment.apiURL}/likes/${LikeId}`).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }



}
