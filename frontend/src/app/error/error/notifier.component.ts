import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectError} from "../state/error-selectors";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierSnackbarComponent} from "../error-snackbar/notifier-snackbar.component";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-error',
  template: ''
})
export class NotifierComponent implements OnInit {

  error$ = this.store.select(selectError());

  constructor(
    private store : Store,
    private snackBar : MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.error$
      .pipe(filter(err => err != ''))
      .subscribe(err => this.openSnackBar(err, 'error'));
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
