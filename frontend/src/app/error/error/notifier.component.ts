import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierSnackbarComponent} from "../error-snackbar/notifier-snackbar.component";
import {Subscription} from "rxjs";
import {ErrorService} from "../service/error.service";

@Component({
  selector: 'app-error',
  template: '<ng-container #container></ng-container>'
})
export class NotifierComponent implements OnDestroy {

  private actionSubscription: Subscription ;
  @ViewChild('container', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  constructor(
    private snackBar : MatSnackBar,
    private errorService : ErrorService,
    private cd: ChangeDetectorRef
  ) {
    this.actionSubscription = this.errorService.actionSubject.subscribe( error => {
      this.displayError(error);
    });
  }

  public displayError(error : string){
    this.openSnackBar(error, 'error');
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.openFromComponent(NotifierSnackbarComponent, {
      data: message,
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [type],
      viewContainerRef: this.containerRef
    });
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }
}
