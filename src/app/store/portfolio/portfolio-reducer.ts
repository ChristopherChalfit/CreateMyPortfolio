import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { errorPortfolio, getPortfolio } from "./portfolio-action";
import { Base } from "../../types/base";
export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');
export const selectPortfolio = createSelector(selectPortfolioState, (state: PortfolioState) => state.portfolio);
export const selectPortfolioError = createSelector(selectPortfolioState, (state: PortfolioState) => state.error);

export interface Portfolio extends Base {
    
}

export interface PortfolioState {
    portfolio: Portfolio | null;
    error: string | null;
}
export const initialState : PortfolioState= {
    portfolio: null,
    error: null
}
export const portfolioReducer = createReducer(
    initialState,
    on(getPortfolio, (state, { portfolio }) => ({ ...state, portfolio, error: null })),
    on(errorPortfolio, (state, { error }) => ({ ...state, error }))
  );