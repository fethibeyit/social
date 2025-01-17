import {LikeModel} from "../../like/models/likeModel.interface";
import {TagModel} from "./tagModel.interface";
import {ShareModel} from "./shareModel.interface";
import {CommentModel} from "../../comment/models/commentModel.interface";
import {AppUserModel} from "../../user/models/appUserModel.interface";
import {FileModel} from "../../file/models/fileModel.interface";

export interface PostModel {

  id : string;
  createdAt : string

  content : string;
  files : FileModel[];
  likes : LikeModel[];
  tags : TagModel[];
  shares : ShareModel[];
  comments : CommentModel[];
  author : AppUserModel;

}
