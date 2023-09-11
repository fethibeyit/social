import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public actionSubject = new Subject<string>();

  triggerAction(action: string) {
    this.actionSubject.next(action);
  }

}
