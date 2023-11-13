import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LikeModel} from "../models/likeModel.interface";
import {LikeService} from "../services/like.service";
import {Like} from "./like-actions";
export interface LikeStateModel {
  Likes: ReadonlyArray<LikeModel>;
  loading : boolean;
  deleteLoading : boolean;
  selected : LikeModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<LikeStateModel>;

@State<LikeStateModel>({
  name: 'likes',
  defaults: {
    Likes: [],
    loading: false,
    deleteLoading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class LikeState {

  constructor(private LikeService: LikeService) {}

  @Selector()
  static Likes(state: LikeStateModel): readonly LikeModel[] {
    return state.Likes;
  }

  @Selector()
  static selectedLike(state: LikeStateModel): LikeModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: LikeStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static deleteLoading(state: LikeStateModel): boolean {
    return state.deleteLoading;
  }

  @Action(Like.Create)
  protected async createLike(ctx: LocalStateContext, action: Like.Create): Promise<void> {
    const { Like } = action;
    console.log("like create")
    ctx.patchState({loading: true})
    try{
      const data = await this.LikeService.createLike(Like).toPromise();
      if (data){
        ctx.patchState( {Likes : [...ctx.getState().Likes, data]});
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Like.Delete)
  protected async deleteLike(ctx: LocalStateContext, action: Like.Delete): Promise<void> {
    const { Like } = action;
    ctx.patchState({deleteLoading: true, selected : Like})
    try{
      const data = await this.LikeService.deleteLike(Like.id).toPromise();
      ctx.patchState( {Likes : ctx.getState().Likes.filter(x=> x.id!= Like.id)});
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

}
