import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorService} from "../service/error.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  constructor( private errorService : ErrorService) {}

  handleError(error: any) {
    this.errorService.triggerAction(error.message);
  }

}
