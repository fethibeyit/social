import {AppUserModel} from "./appUserModel.interface";

export interface TagModel {

  id : string;
  createdAt : string;

  position : number;
  user : AppUserModel;

}
