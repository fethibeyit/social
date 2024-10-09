import {PostModel} from "../../post/models/postModel.interface";
import {FileUploadModel} from "../models/fileUploadModel.interface";
import {FileModel} from "../models/fileModel.interface";

export namespace AppFile {

  export class AddFile {
    static readonly type = '[File] Add File';
    constructor(public file: File) {}
  }

  export class RemoveFile {
    static readonly type = '[File] Remove File';
    constructor(public url: string) {}
  }

  export class RemoveAllFiles {
    static readonly type = '[File] Remove All Files';
  }

  export class Upload {
    static readonly type = '[File] Upload';
    constructor(public file: FileUploadModel) {}
  }

  export class CreateImageUrl {
    static readonly type = '[File] Create Image Url';
    constructor(public file: FileModel) {}
  }


  export class UploadAll {
    static readonly type = '[File] Upload All';
  }

  export class ClearMetadata {
    static readonly type = '[File] Clear Metadata';
  }

}
