import { Component } from '@angular/core';
import {FileImageModel} from "../../models/fileImageModel.interface";
import {Store} from "@ngxs/store";
import {AppFile} from "../../state/file-actions";

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent {
  public files: FileImageModel[] = [];

  constructor(
    private store: Store,
    ){}

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
        let result : FileImageModel = {file : files[i], src : URL.createObjectURL(files[i]!)}
        console.log(result);
        this.files.push(result);
      };
  }
  deleteFromArray(index : any) {
    console.log(this.files);
    this.files.splice(index, 1);
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

  upload(): void {
    if (this.files) {
      const file: File | null = this.files[0].file;

      if (file) {
        this.store.dispatch(new AppFile.Upload(file));

        // this.uploadService.upload(file).subscribe(
        //   (event: any) => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //       console.log("progress", Math.round(100 * event.loaded / event.total)) ;
        //     } else if (event instanceof HttpResponse) {
        //       console.log("upload", event);
        //     }
        //   },
        //   (err: any) => {
        //     console.log(err);
        //   });
      }
    }
  }
}
