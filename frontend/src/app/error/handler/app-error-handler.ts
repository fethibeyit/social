import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorService} from "../service/error.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  constructor(private errorService : ErrorService) {
  }
  handleError(error: any) {
    console.log('ERROR! ', error);
    this.errorService.displayError(error.message); // to do
  }
}
