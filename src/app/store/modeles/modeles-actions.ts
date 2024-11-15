import { createAction, props } from "@ngrx/store"
import { Modeles } from "./modeles-reduces";


export const getAllModeles = createAction(
    "[Modeles] Get all Modeles",
    props<{ Modeles: Modeles[] }>()  
  );
  