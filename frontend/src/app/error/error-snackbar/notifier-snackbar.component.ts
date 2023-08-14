import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './notifier-snackbar.component.html',
  styleUrls: ['./notifier-snackbar.component.css']
})
export class NotifierSnackbarComponent {

  constructor(
    public sbRef: MatSnackBarRef<NotifierSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) {}

}
