import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AuthenticateService} from "../services/authenticate.service";
import {Auth} from "./auth-actions";
import {ProfileModel} from "../models/profileModel.interface";

export interface AuthStateModel {
  token: string;
  profile: ProfileModel | null;
  error: string | null;
  loading : boolean;
}

type LocalStateContext = StateContext<AuthStateModel>;

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: "",
    profile: null,
    error: null,
    loading : false
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
  static profile(state: AuthStateModel): ProfileModel | null {
    return state?.profile;
  }
  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Action(Auth.Login)
  protected async login(ctx: LocalStateContext, action: Auth.Login): Promise<void> {
    const { credentials } = action;
    ctx.patchState({loading: true , error: null})
    try{
      const data = await this.authService.login(credentials).toPromise();
      ctx.patchState({ token: data["access-token"], loading: false});
    } catch (err : any){
      ctx.patchState({ loading: false });
      if(err.status === 401){
        ctx.patchState({error : "Le nom d'utlisateur ou le mot de passe sont invalides !"})
      } else {
        throw (err);
      }
    }
  }

  @Action(Auth.SetStorageToken)
  protected async setStorageToken(ctx: LocalStateContext, action: Auth.SetStorageToken): Promise<void> {
    let token = this.authService.getToken();
    ctx.patchState({ token: token});
  }

  @Action(Auth.SetToken)
  protected async setToken(ctx: LocalStateContext, action: Auth.SetToken): Promise<void> {
    const { token } = action;
    ctx.patchState({ token: token});
  }

  @Action(Auth.GetProfile)
  protected async getProfile(ctx: LocalStateContext, action: Auth.GetProfile): Promise<void> {
    debugger
    ctx.patchState({loading: true , error: null})
    try{
      const data = await this.authService.getProfile().toPromise();
      ctx.patchState({profile: data})
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Auth.CreateUser)
  protected async createUser(ctx: LocalStateContext, action: Auth.CreateUser): Promise<void> {
    const { appUser } = action;
    ctx.patchState({loading: true , error: null})
    try{
      const data = await this.authService.register(appUser).toPromise();
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(Auth.Logout)
  protected async logout(ctx: LocalStateContext, action: Auth.Logout): Promise<void> {
    ctx.patchState({token: '', profile: null , error: null})
  }

}
