export interface Base {
    id: string;
    firstName: string | null;  
    lastName: string | null;  
    birthDate: string | null;  
    email: string;
    linkId: string | null;
    photoProfile: string;
    description: string ;
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