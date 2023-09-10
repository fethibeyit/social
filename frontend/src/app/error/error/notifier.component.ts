// import {Component, OnInit} from '@angular/core';
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {NotifierSnackbarComponent} from "../error-snackbar/notifier-snackbar.component";
//
// @Component({
//   selector: 'app-error',
//   template: ''
// })
// export class NotifierComponent implements OnInit {
//
//   constructor(
//     private store : Store,
//     private snackBar : MatSnackBar,
//   ) {}
//
//   ngOnInit(): void {
//     this.error$
//       .pipe(filter(err => err != ''))
//       .subscribe(err => this.openSnackBar(err, 'error'));
//   }
//
//   openSnackBar(message: string, type: string) {
//     this.snackBar.openFromComponent(NotifierSnackbarComponent, {
//       data: message,
//       duration: 2000,
//       verticalPosition: 'top',
//       panelClass: [type]
//     });
//   }
//
// }
