import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {FileModel} from "../models/fileModel.interface";
import {FileUploadModel} from "../models/fileUploadModel.interface";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  upload(file: FileUploadModel): Observable<FileModel> {
    const formData: FormData = new FormData();
    formData.append('file', file.file);
    formData.append('url', file.url);
    return this.http.post<FileModel>(`${environment.apiURL}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    }).pipe(
      tap((data: FileModel) => {
        console.log("file model", data)
        return data
      }),
      catchError(err => throwError(() => err))
    )
  }

  download(url: string) {
    return this.http
      .get(`${environment.apiURL}/files/${url}`, {responseType: 'blob'});
  }

}
