import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { modeles } from "../../types/modeles";
import { getAllModeles } from "./modeles-actions";
export const selectModelesState = createFeatureSelector<ModelesState>('modeles');
export const selectModeles = createSelector(selectModelesState, (state: ModelesState) => state.Modeles);
export const selectModelesError = createSelector(selectModelesState, (state: ModelesState) => state.Modeles);
export interface Modeles extends modeles {
    
}

export interface ModelesState {
    Modeles: Modeles[] | null;
    error: string | null;
}
export const initialState : ModelesState= {
    Modeles: null,
    error: null
}
export const modelesReducer = createReducer(
    initialState,
    on(getAllModeles, (state, { Modeles }) => ({ ...state, Modeles, error: null })),
  );