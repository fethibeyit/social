import {LikeModel} from "../models/likeModel.interface";
import {LikeCreateModel} from "../models/likeCreateModel.interface";

export namespace Like {
  export class Create {
    static readonly type = '[Like] Create';
    constructor(public Like: LikeCreateModel) {}
  }

  export class Delete {
    static readonly type = '[Like] Delete';
    constructor(public Like: LikeModel) {}
  }
}
