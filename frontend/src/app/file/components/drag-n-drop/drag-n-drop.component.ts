import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../dialog-confirm/dialog-confirm.component";
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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store,
    ){}

  onFileChange(event : Event){
    const elem = event.target as HTMLInputElement;
    if (elem.files && elem.files.length > 0) {
      let files : (File | null) []= [];
      for(let i = 0; i < elem.files.length ; ++i){
        files.push(elem.files.item(i))
      }
      this.populateFiles( files);
    }
  }

  populateFiles(files : (File | null)[]){
      this.files = [];
      for (let i =0 ; i < files.length; ++i) {
        let result : FileImageModel = {file : files[i], src : URL.createObjectURL(files[i]!)}
        this.files.push(result);
      }
      this._snackBar.open("Successfully upload!", 'Close', {
        duration: 2000,
      });
  }

  deleteFile(f : File){
    this.files = this.files.filter(function(w){ return w.file?.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  openConfirmDialog(pIndex : any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files[pIndex].file?.name ?? "";
    dialogRef.componentInstance.fIndex = pIndex;


    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index : any) {
    console.log(this.files);
    this.files.splice(index, 1);
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
