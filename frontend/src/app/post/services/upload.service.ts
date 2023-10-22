import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {delay, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {PostModel} from "../models/postModel.interface";
import {catchError, tap} from "rxjs/operators";
import {FileModel} from "../models/fileModel.interface";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<FileModel> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileModel>(`${environment.apiURL}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    }).pipe(
      tap((data: FileModel) => {
        console.log("file model" , data)
        return data}),
      catchError(err => throwError(() => err))
    )
  }

}
