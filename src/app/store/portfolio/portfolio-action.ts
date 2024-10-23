import { createAction, props } from "@ngrx/store"
import { Portfolio } from "./portfolio-reducer";

export const getPortfolio = createAction(
    "[Portfolio] get Portfolio",
    props<{ portfolio: Portfolio }>()  
  );
  
 
  export const errorPortfolio = createAction(
    "[Portfolio] Error Portfolio",
    props<{ error: string }>() 
  );