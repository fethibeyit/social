import {AppUserModel} from "./appUserModel.interface";

export interface ShareModel {

  id : string;
  createdAt : Date;

  owner : AppUserModel;

}
