import {PostState} from "../post/state/post-reducers";
import {ErrorState} from "../error/state/error-reducers";


export interface AppState {
  PostState: PostState,
  ErrorState: ErrorState,
}
