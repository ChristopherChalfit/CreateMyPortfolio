import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loginUser, disconnectUser, errorLogin } from "./auth-action";
import { Base } from "../../types/base";
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

export interface User extends Base{
    
}

export interface UserState {
    user: User | null;
    error: string | null;
}
export const initialState : UserState= {
    user: null,
    error: null
}
export const userReducer = createReducer(
    initialState,
    on(loginUser, (state, { user }) => ({ ...state, user, error: null })),
    on(disconnectUser, state => ({ ...state, user: null })), 
    on(errorLogin, (state, { error }) => ({ ...state, error }))
  );