import {AppUserModel} from "./appUserModel.interface";

export interface ShareModel {

  id : string;
  createdAt : string;

  owner : AppUserModel;

}
