import { CommonLocationOptions, GoogleLocationInfoError, GoogleLocationInfoRes } from "./types";
export declare const setupGooglePlacesApiScript: (googleApiKey: string) => void;
export declare const getCurrentLocationDetails: (options?: CommonLocationOptions) => Promise<GoogleLocationInfoRes | GoogleLocationInfoError>;
