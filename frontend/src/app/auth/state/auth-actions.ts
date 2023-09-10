import {UserCredentials} from "../models/userCredentials.interface";

export namespace Auth {
  export class Login {
    static readonly type = '[AUTH] Login';
    constructor(public credentials: UserCredentials) {}
  }

  export class Logout {
    static readonly type = '[AUTH] Logout';
  }

  export class CreateUser {
    static readonly type = '[AUTH] Create User';
    constructor(public user: string) {}
  }
}
