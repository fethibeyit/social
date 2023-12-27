import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {Post} from "../../post/state/post-actions";
import {CommentModel} from "../models/commentModel.interface";
import {CommentService} from "../services/comment.service";
import {Comment} from "./comment-actions";

export interface CommentStateModel {
  comments: ReadonlyArray<CommentModel>;
  loading : boolean;
  deleteLoading : boolean;
  selected : CommentModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<CommentStateModel>;

@State<CommentStateModel>({
  name: 'comments',
  defaults: {
    comments: [],
    loading: false,
    deleteLoading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class CommentState {

  constructor(private commentService: CommentService) {}

  @Selector()
  static comments(state: CommentStateModel): readonly CommentModel[] {
    return state.comments;
  }

  @Selector()
  static selectedComment(state: CommentStateModel): CommentModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: CommentStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static deleteLoading(state: CommentStateModel): boolean {
    return state.deleteLoading;
  }

  @Action(Comment.Create)
  protected async createComment(ctx: LocalStateContext, action: Comment.Create): Promise<void> {
    const { comment } = action;
    console.log("comment create")
    ctx.patchState({loading: true})
    try{
      const data = await this.commentService.createComment(comment).toPromise();
      if (data){
        ctx.patchState( {comments : [...ctx.getState().comments, data]});
        // ctx.dispatch(new Post.AddComment(data));
      }
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Comment.Update)
  protected async updateComment(ctx: LocalStateContext, action: Comment.Update): Promise<void> {
    const { comment } = action;
    ctx.patchState({loading: true})
    try{
      const data = await this.commentService.updateComment(comment).toPromise();
      ctx.patchState( {comments : ctx.getState().comments.map(x => x.id === comment.id ? comment : x)});
      // ctx.dispatch(new Post.UpdateComment(comment));
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Comment.Delete)
  protected async deleteComment(ctx: LocalStateContext, action: Comment.Delete): Promise<void> {
    const { comment } = action;
    ctx.patchState({deleteLoading: true, selected : comment})
    try{
      const data = await this.commentService.deleteComment(comment.id).toPromise();
      ctx.patchState( {comments : ctx.getState().comments.filter(x=> x.id!= comment.id)});
      // ctx.dispatch(new Post.RemoveComment(comment));
    }finally {
      ctx.patchState({deleteLoading: false, selected: null})
    }
  }

}
