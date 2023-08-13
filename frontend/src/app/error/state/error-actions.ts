import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Post} from "../../post/models/post.interface";

export const ErrorActions = createActionGroup({
  source: 'ERROR',
  events: {
    'Send Error' : props<{ error: string }>(),

  }
})
