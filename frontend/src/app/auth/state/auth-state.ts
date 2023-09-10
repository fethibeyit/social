import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AuthenticateService} from "../../core/services/authenticate.service";
import {Auth} from "./auth-actions";

export interface AuthStateModel {
  token: string;
  error: string | null;
}

type LocalStateContext = StateContext<AuthStateModel>;

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: "",
    error: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService : AuthenticateService) {}


  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }
  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Action(Auth.Login)
  protected async login(ctx: LocalStateContext, action: Auth.Login): Promise<void> {
    const { credentials } = action;
    const data = await this.authService.login(credentials).toPromise();
    ctx.patchState({ token: data["access-token"] });
  }

}
