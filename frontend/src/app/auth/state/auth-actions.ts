import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserCredentials} from "../models/userCredentials.interface";

export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'Login' : props<{ credentials: UserCredentials }>(),
    'Set token' : props<{ token: string }>(),
    'Auth error' : props<{ error: string }>(),
    'Create user' : emptyProps(),
  }
})
