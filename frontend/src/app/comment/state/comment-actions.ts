import {CommentCreateModel} from "../models/commentCreateModel.interface";
import {CommentModel} from "../models/commentModel.interface";

export namespace Comment {
  export class Create {
    static readonly type = '[COMMENT] Create';
    constructor(public comment: CommentCreateModel) {}
  }

  export class Update {
    static readonly type = '[COMMENT] Update';
    constructor(public comment: CommentModel) {}
  }

  export class Delete {
    static readonly type = '[COMMENT] Delete';
    constructor(public comment: CommentModel) {}
  }
}
