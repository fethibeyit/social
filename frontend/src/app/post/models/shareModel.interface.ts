import {AppUserModel} from "../../user/models/appUserModel.interface";

export interface ShareModel {

  id : string;
  createdAt : string;

  owner : AppUserModel;

}
