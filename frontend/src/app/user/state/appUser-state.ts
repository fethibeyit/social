import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AppUserModel} from "../models/appUserModel.interface";
import {AppUserService} from "../services/appUser.service";
import {AppUser} from "./appUser-actions";

export interface AppUserStateModel {
  appUsers: ReadonlyArray<AppUserModel>;
  loading : boolean;
  deleteLoading : boolean;
  selected : AppUserModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<AppUserStateModel>;

@State<AppUserStateModel>({
  name: 'appUsers',
  defaults: {
    appUsers: [],
    loading: false,
    deleteLoading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class AppUserState {

  constructor(private AppUserService: AppUserService) {}

  @Selector()
  static appUsers(state: AppUserStateModel): readonly AppUserModel[] {
    return state.appUsers;
  }

  @Selector()
  static selectedAppUser(state: AppUserStateModel): AppUserModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: AppUserStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static deleteLoading(state: AppUserStateModel): boolean {
    return state.deleteLoading;
  }

  ngxsOnInit(ctx: StateContext<AppUserStateModel>): void {
    ctx.dispatch(new AppUser.GetList());
  }

  @Action(AppUser.GetList)
  protected async getList(ctx: LocalStateContext, action: AppUser.GetList): Promise<void> {
    ctx.patchState({loading: true})
    try{
      const appUsers = await this.AppUserService.getAppUsers().toPromise();
      if(appUsers){
        ctx.patchState({ appUsers: appUsers});
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(AppUser.Update)
  protected async updateAppUser(ctx: LocalStateContext, action: AppUser.Update): Promise<void> {
    const { appUser } = action;
    ctx.patchState({loading: true})
    try{
      const data = await this.AppUserService.updateAppUser(appUser).toPromise();
      ctx.patchState( {appUsers : ctx.getState().appUsers.map(x => x.id === appUser.id ? appUser : x)});
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(AppUser.Delete)
  protected async deleteAppUser(ctx: LocalStateContext, action: AppUser.Delete): Promise<void> {
    const { appUser } = action;
    ctx.patchState({deleteLoading: true, selected : appUser})
    try{
      const data = await this.AppUserService.deleteAppUser(appUser.id).toPromise();
      ctx.patchState( {appUsers : ctx.getState().appUsers.filter(x=> x.id!= appUser.id)});
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

}
