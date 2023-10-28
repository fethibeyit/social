import {AppUserModel} from "./appUserModel.interface";

export interface LikeModel {

  id : string;
  createdAt : Date;

  type : number;
  owner : AppUserModel;

}
