export interface CommonLocationOptions {
  cache?: boolean;
}

export interface GoogleLocationInfoRes {
  data: google.maps.GeocoderResponse;
}

export interface GoogleLocationInfoError {
  error: string;
}
