import {PostModel} from "../models/postModel.interface";
import {LikeModel} from "../../like/models/likeModel.interface";

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

  export class AddLike {
    static readonly type = '[POST] Add Like';
    constructor(public like: LikeModel) {}
  }

  export class UpdateLike {
    static readonly type = '[POST] Update Like';
    constructor(public like: LikeModel) {}
  }

  export class RemoveLike {
    static readonly type = '[POST] Remove Like';
    constructor(public like: LikeModel) {}
  }
}
