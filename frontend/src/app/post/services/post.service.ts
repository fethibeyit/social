import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PostModel} from "../models/postModel.interface";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiURL}/posts`).pipe(
      tap((data: PostModel[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  deletePost(postId: string) {
    return this.http.delete<any>(`${environment.apiURL}/posts/${postId}`).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  createPost(post : PostModel): Observable<PostModel>{
    return this.http.post<PostModel>("http://localhost:8080/api/posts", post).pipe(
      tap((data: PostModel) => data),
      catchError(err => throwError(() => err))
    )
  }

  updatePost(post : PostModel): Observable<PostModel>{
    return this.http.put<PostModel>("http://localhost:8080/api/posts/" + post.id , post).pipe(
      tap((data: PostModel) => data),
      catchError(err => throwError(() => err))
    )
  }

}
