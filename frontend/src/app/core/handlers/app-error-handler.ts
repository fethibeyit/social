import {ErrorHandler, Injectable} from "@angular/core";
import {NotifierService} from "../../notifier/service/notifier.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  constructor( private errorService : NotifierService) {}

  handleError(error: any) {
    console.log(error)
    this.errorService.triggerAction(error.message);
  }

}
