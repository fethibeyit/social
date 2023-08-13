import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectError} from "../state/error-selectors";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../error-snackbar/error-snackbar.component";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error$ = this.store.select(selectError());

  constructor(
    private store : Store,
    private snackBar : MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.error$
      .pipe(filter(err => err != ''))
      .subscribe(err => this.openSnackBar(err));
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: message,
      duration: 2000,
      verticalPosition: 'top',
    });

  }

}
