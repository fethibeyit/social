import {AppUserModel} from "../../post/models/appUserModel.interface";
import {LikeModel} from "../../like/models/likeModel.interface";
import {TagModel} from "../../post/models/tagModel.interface";

export interface CommentModel {

  id : string;
  createdAt : string;

  content : string;
  author : AppUserModel;
  likes : LikeModel[];
  tags : TagModel[];
  replies : CommentModel[];
  post_id? : string ;
  reply_id? : string;

}
