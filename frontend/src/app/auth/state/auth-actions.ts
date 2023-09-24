import {UserCredentials} from "../models/userCredentials.interface";
import {AppUserCreateModel} from "../models/appUserCreateModel.interface";

export namespace Auth {
  export class Login {
    static readonly type = '[AUTH] Login';
    constructor(public credentials: UserCredentials) {}
  }

  export class SetToken {
    static readonly type = '[AUTH] Set Token';
    constructor(public token: string) {}
  }

  export class Logout {
    static readonly type = '[AUTH] Logout';
  }

  export class CreateUser {
    static readonly type = '[AUTH] Create User';
    constructor(public appUser: AppUserCreateModel) {}
  }
}
