import {PostModel} from "../../post/models/postModel.interface";
import {FileUploadModel} from "../models/fileUploadModel.interface";

export namespace AppFile {

  export class AddFile {
    static readonly type = '[File] Add File';
    constructor(public file: FileUploadModel) {}
  }

  export class RemoveFile {
    static readonly type = '[File] Remove File';
    constructor(public file: FileUploadModel) {}
  }

  export class Upload {
    static readonly type = '[File] Upload';
    constructor(public file: FileUploadModel) {}
  }

  export class UploadAll {
    static readonly type = '[File] Upload All';
  }

  export class Clear {
    static readonly type = '[File] Clear';
  }

}
