import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { errorPortfolio, getPortfolio } from "./portfolio-action";
export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');
export const selectPortfolio = createSelector(selectPortfolioState, (state: PortfolioState) => state.portfolio);
export const selectPortfolioError = createSelector(selectPortfolioState, (state: PortfolioState) => state.error);

export interface Portfolio {
    id: string;
    firstName: string | null;  
    lastName: string | null;  
    birthDate: string | null;  
    email: string;
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

// Définir les nouvelles interfaces
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
    field: string;
    school: string;
    startDate: string;
    endDate: string;
    userId: string;
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