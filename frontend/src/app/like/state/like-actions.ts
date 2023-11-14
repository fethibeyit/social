import {LikeModel} from "../models/likeModel.interface";
import {LikeCreateModel} from "../models/likeCreateModel.interface";

export namespace Like {
  export class Create {
    static readonly type = '[LIKE] Create';
    constructor(public like: LikeCreateModel) {}
  }

  export class Update {
    static readonly type = '[LIKE] Update';
    constructor(public like: LikeModel) {}
  }

  export class Delete {
    static readonly type = '[LIKE] Delete';
    constructor(public like: LikeModel) {}
  }
}
