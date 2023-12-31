import {TagModel} from "../../post/models/tagModel.interface";

export interface CommentCreateModel {

  content : string;
  tags : TagModel[];
  post_id? : string ;
  reply_id? : string;

}
