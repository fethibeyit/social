import {AppUserModel} from "./appUserModel.interface";
import {LikeModel} from "../../like/models/likeModel.interface";
import {TagModel} from "./tagModel.interface";

export interface CommentModel {

  id : string;
  createdAt : Date

  content : string;
  author : AppUserModel;
  likes : LikeModel[];
  tags : TagModel[];
  replies : CommentModel[];

}
