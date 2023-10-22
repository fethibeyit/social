import {PostModel} from "../../post/models/postModel.interface";

export namespace AppFile {
  export class Upload {
    static readonly type = '[File] Upload';
    constructor(public file: File) {}
  }

  export class Clear {
    static readonly type = '[File] Clear';
  }

}
