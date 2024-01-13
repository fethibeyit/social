import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierSnackbarComponent} from "../notifier-snackbar/notifier-snackbar.component";
import {Subscription} from "rxjs";
import {NotifierService} from "../service/notifier.service";

@Component({
  selector: 'app-notifier',
  template: '<ng-container #container></ng-container>'
})
export class NotifierComponent implements OnDestroy {

  private actionSubscription: Subscription ;
  @ViewChild('container', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  constructor(
    private snackBar : MatSnackBar,
    private notifierService : NotifierService,
    private cd: ChangeDetectorRef
  ) {
    this.actionSubscription = this.notifierService.actionSubject.subscribe( message => {
      this.openSnackBar(message, 'error');
    });
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
