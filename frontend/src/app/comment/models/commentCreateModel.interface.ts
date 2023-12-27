import {TagModel} from "../../post/models/tagModel.interface";

export interface CommentCreateModel {

  content : string;
  tags : TagModel[];

}
