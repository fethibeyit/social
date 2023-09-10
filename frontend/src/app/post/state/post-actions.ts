import {PostModel} from "../models/postModel.interface";

export namespace Post {
  export class Create {
    static readonly type = '[POST] Create';
    constructor(public post: PostModel) {}
  }

  export class Update {
    static readonly type = '[POST] Update';
    constructor(public post: PostModel) {}
  }

  export class GetList {
    static readonly type = '[POST] Get List';
  }

  export class Delete {
    static readonly type = '[POST] Delete';
    constructor(public post: PostModel) {}
  }
}
