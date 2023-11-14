import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LikeModel} from "../models/likeModel.interface";
import {LikeService} from "../services/like.service";
import {Like} from "./like-actions";
import {Post} from "../../post/state/post-actions";

export interface LikeStateModel {
  likes: ReadonlyArray<LikeModel>;
  loading : boolean;
  deleteLoading : boolean;
  selected : LikeModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<LikeStateModel>;

@State<LikeStateModel>({
  name: 'likes',
  defaults: {
    likes: [],
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
  static likes(state: LikeStateModel): readonly LikeModel[] {
    return state.likes;
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
    const { like } = action;
    console.log("like create")
    ctx.patchState({loading: true})
    try{
      const data = await this.LikeService.createLike(like).toPromise();
      if (data){
        ctx.patchState( {likes : [...ctx.getState().likes, data]});
        ctx.dispatch(new Post.AddLike(data));
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Like.Update)
  protected async updateLike(ctx: LocalStateContext, action: Like.Update): Promise<void> {
    const { like } = action;
    ctx.patchState({loading: true})
    try{
      const data = await this.LikeService.updateLike(like).toPromise();
      ctx.patchState( {likes : ctx.getState().likes.map(x => x.id === like.id ? like : x)});
      ctx.dispatch(new Post.UpdateLike(like));
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Like.Delete)
  protected async deleteLike(ctx: LocalStateContext, action: Like.Delete): Promise<void> {
    const { like } = action;
    ctx.patchState({deleteLoading: true, selected : like})
    try{
      const data = await this.LikeService.deleteLike(like.id).toPromise();
      ctx.patchState( {likes : ctx.getState().likes.filter(x=> x.id!= like.id)});
      ctx.dispatch(new Post.RemoveLike(like));
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

}
