import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Post} from "../models/post.interface";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiURL}/posts`).pipe(
      tap((data: Post[]) => data),
      catchError(err => throwError(() => err))
    )
  }

  deletePost(postId: string) {
    return this.http.delete<any>(`${environment.apiURL}/posts/${postId}`).pipe(
      tap((data: any) => data),
      catchError(err => throwError(() => err))
    )
  }

  createPost(post : Post): Observable<Post>{
    return this.http.post<Post>("http://localhost:8080/api/posts", post).pipe(
      tap((data: Post) => data),
      catchError(err => throwError(() => err))
    )
  }

  updatePost(post : Post): Observable<Post>{
    return this.http.put<Post>("http://localhost:8080/api/posts/" + post.id , post).pipe(
      tap((data: Post) => data),
      catchError(err => throwError(() => err))
    )
  }

}
