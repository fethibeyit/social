import {AppUserModel} from "../../user/models/appUserModel.interface";
import {LikeType} from "../enums/like-type.enum";

export interface LikeModel {

  id : string;
  createdAt : string;

  type : LikeType;
  owner : AppUserModel;

  post_id? : string ;
  comment_id? : string;
  message_id? : string;

}
