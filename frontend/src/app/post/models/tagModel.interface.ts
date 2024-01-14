import {AppUserModel} from "../../user/models/appUserModel.interface";

export interface TagModel {

  id : string;
  createdAt : string;

  position : number;
  user : AppUserModel;

}
