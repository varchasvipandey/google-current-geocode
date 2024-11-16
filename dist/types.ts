export interface CommonLocationOptions {
  cache?: boolean;
}

export interface GoogleLocationInfoRes {
  data?: google.maps.GeocoderResponse;
  error?: string;
  status: boolean;
}
