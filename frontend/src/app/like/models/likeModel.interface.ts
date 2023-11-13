import {AppUserModel} from "../../post/models/appUserModel.interface";
import {LikeType} from "../enums/like-type.enum";

export interface LikeModel {

  id : string;
  createdAt : Date;

  type : LikeType;
  owner : AppUserModel;

}
