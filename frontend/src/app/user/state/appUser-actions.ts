import {AppUserModel} from "../models/appUserModel.interface";

export namespace AppUser {

  export class GetList {
    static readonly type = '[APPUSER] Get List';
  }
  export class Update {
    static readonly type = '[APPUSER] Update';
    constructor(public appUser: AppUserModel) {}
  }

  export class Delete {
    static readonly type = '[APPUSER] Delete';
    constructor(public appUser: AppUserModel) {}
  }
}
