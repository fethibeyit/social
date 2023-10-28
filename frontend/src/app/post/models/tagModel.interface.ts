import {AppUserModel} from "./appUserModel.interface";

export interface TagModel {

  id : string;
  createdAt : Date;

  position : number;
  user : AppUserModel;

}
