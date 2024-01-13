import {
  Component, NgZone,
  OnDestroy,

} from '@angular/core';

import {Subscription} from "rxjs";
import {NotifierService} from "../service/notifier.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-notifier',
  template: '<p-toast ></p-toast>',
  providers: [MessageService]
})
export class NotifierComponent implements OnDestroy {

  private actionSubscription: Subscription ;

  constructor(
    private notifierService : NotifierService,
    private messageService: MessageService,
    private ngZone: NgZone
  ) {
    this.actionSubscription = this.notifierService.actionSubject.subscribe( message => {
      this.ngZone.run(() => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message }));
    });
  }

  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }
}
