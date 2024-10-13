import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loginUser, disconnectUser, errorLogin } from "./auth-action";
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

export interface User {
    id: string;
    firstName: string | null;  
    lastName: string | null;  
    birthDate: string | null;  
    email: string;
    linkId: string | null;
    photoProfile: string;
    phone: string | null;  
    address: string | null;  
    website: string | null;  
    github: string | null;  
    linkedin: string | null;  
    vehicle: string | null;  
    role: string;
    drivingLicenses: DrivingLicense[];  
    socialLinks: SocialLink[];  
    languages: Language[];  
    skills: Skill[];  
    experiences: Experience[];  
    educations: Education[];  
}

export interface DrivingLicense {
    id: string;
    type: string;
    userId: string;
}

export interface SocialLink {
    id: string;
    platform: string;
    url: string;
    userId: string;
}

export interface Language {
    id: string;
    name: string;
    level: string;
    userId: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    userId: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    userId: string;
}

export interface Education {
    id: string;
    diplome: string;
    description: string;
    school: string;
    startDate: string;
    endDate: string;
    userId: string;
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