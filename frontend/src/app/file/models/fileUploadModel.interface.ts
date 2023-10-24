import {Guid} from "guid-typescript";

export interface FileUploadModel {
  id : Guid
  file : File | null;
  src : string;
  uploaded : boolean;

}
