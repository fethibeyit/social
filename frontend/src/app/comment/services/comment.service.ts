import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {CommentCreateModel} from "../models/commentCreateModel.interface";
import {CommentModel} from "../models/commentModel.interface";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment : CommentCreateModel): Observable<CommentModel>{
    return this.http.post<CommentModel>(`${environment.apiURL}/comments`, comment).pipe(
      tap((data: CommentModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  updateComment(comment : CommentModel): Observable<CommentModel>{
    return this.http.put<CommentModel>(`${environment.apiURL}/comments/${comment.id}` , comment).pipe(
      tap((data: CommentModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  deleteComment(commentId: string) {
    return this.http.delete<any>(`${environment.apiURL}/comments/${commentId}`).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }
}
