import {AppUserModel} from "../../user/models/appUserModel.interface";
import {LikeType} from "../enums/like-type.enum";

export interface LikeCreateModel {

  type : LikeType;
  post_id? : string ;
  comment_id? : string;
  message_id? : string;

}
