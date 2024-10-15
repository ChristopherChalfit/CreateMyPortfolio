import { createAction, props } from "@ngrx/store"
import { User } from "./auth-reducer";

export const loginUser = createAction(
    "[Auth] Login User",
    props<{ user: User }>()  
  );
  
  export const disconnectUser = createAction(
    "[Auth] Disconnect User"
  );
  
  export const errorLogin = createAction(
    "[Auth] Error Login",
    props<{ error: string }>() 
  );