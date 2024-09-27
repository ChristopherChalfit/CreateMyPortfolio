import { createAction, props } from "@ngrx/store"
import { User } from "./auth-reducer";

// Action pour connecter l'utilisateur avec ses informations (id, email, username, etc.)
export const loginUser = createAction(
    "[Auth] Login User",
    props<{ user: User }>()  
  );
  
  // Action pour déconnecter l'utilisateur, aucun paramètre nécessaire
  export const disconnectUser = createAction(
    "[Auth] Disconnect User"
  );
  
  // Action pour gérer une erreur de connexion
  export const errorLogin = createAction(
    "[Auth] Error Login",
    props<{ error: string }>() 
  );