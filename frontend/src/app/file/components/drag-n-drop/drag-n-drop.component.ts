import { Component } from '@angular/core';
import {FileUploadModel} from "../../models/fileUploadModel.interface";
import {Select, Store} from "@ngxs/store";
import {AppFile} from "../../state/file-actions";
import {Guid} from "guid-typescript";
import {Observable} from "rxjs";
import {FileState} from "../../state/file-state";

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent {

  @Select(FileState.filesData) files$!: Observable<FileUploadModel[]> ;

  constructor(private store: Store){}

  onFileChange(event : Event){
    const elem = event.target as HTMLInputElement;
    if (elem.files && elem.files.length > 0) {
      let files : (File | null) []= [];
      for(let i = 0; i < elem.files.length ; ++i){
        files.push(elem.files.item(i))
      }
      this.populateFiles(files);
    }
  }

  populateFiles(files : (File | null)[]){
      for (let i =0 ; i < files.length; ++i) {
        if(files[i]){
          this.store.dispatch(new AppFile.AddFile(files[i]!));
        }
      }
  }

  deleteFile(url : string) {
    this.store.dispatch(new AppFile.RemoveFile(url));
  }

  displayFileName(fileName : string | undefined){
    if(fileName && fileName.length > 15){
      return fileName.substring(0,12) + " ...";
    }
    return fileName;
  }

  fileIsImage(file : File | null){
    return file?.type === 'image/jpeg' || file?.type === 'image/png';
  }

  fileIsPdf(file : File | null){
    return file?.type === 'application/pdf';
  }

}
