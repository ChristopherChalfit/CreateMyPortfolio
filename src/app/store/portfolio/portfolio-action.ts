import { createAction, props } from "@ngrx/store"
import { Portfolio } from "./portfolio-reducer";

export const getPortfolio = createAction(
    "[Portfolio] get Portfolio",
    props<{ portfolio: Portfolio }>()  
  );
  
 
  // Action pour gérer une erreur de connexion
  export const errorPortfolio = createAction(
    "[Portfolio] Error Portfolio",
    props<{ error: string }>() 
  );