import {LikeModel} from "../../like/models/likeModel.interface";
import {TagModel} from "./tagModel.interface";
import {ShareModel} from "./shareModel.interface";
import {CommentModel} from "./commentModel.interface";
import {AppUserModel} from "./appUserModel.interface";
import {FileModel} from "../../file/models/fileModel.interface";

export interface PostModel {

  id : string;
  createdAt : Date

  content : string;
  files : FileModel[];
  likes : LikeModel[];
  tags : TagModel[];
  shares : ShareModel[];
  comments : CommentModel[];
  author : AppUserModel;

}
