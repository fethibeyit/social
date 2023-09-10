import { Injectable } from '@angular/core';
import {NotifierSnackbarComponent} from "../error-snackbar/notifier-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar : MatSnackBar) { }

  public displayError(error : string){
    this.openSnackBar(error, 'error');
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.openFromComponent(NotifierSnackbarComponent, {
      data: message,
      duration: 2000,
      verticalPosition: 'top',
      panelClass: [type]
    });
  }

}
