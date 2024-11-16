import { LRUCache } from "lru-cache";
import { CommonLocationOptions, GoogleLocationInfoRes } from "./types";

const options = {
  max: 10,
  ttl: 1000 * 60 * 5,
};

const locationCache = new LRUCache(options);

export const setupGooglePlacesApiScript = (googleApiKey: string) => {
  const scriptId = "google-places-api-script";
  const existingScript = document.getElementById(scriptId);

  if (!existingScript) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&v=weekly`;
    script.async = true;
    document.head.appendChild(script);
  }
};

const getLocationAsync = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      (error: GeolocationPositionError) => reject(error)
    );
  });
};

const getLocationInfoAsync = async (
  location: GeolocationPosition,
  options?: CommonLocationOptions
): Promise<GoogleLocationInfoRes> => {
  try {
    if (!location) return { error: "Location not found", status: false };

    const cacheKey = `${location.coords.latitude},${location.coords.longitude}`;

    if (options?.cache) {
      const cachedResult = locationCache.get(cacheKey);
      if (cachedResult) {
        return {
          status: true,
          data: cachedResult as google.maps.GeocoderResponse,
        };
      }
    }

    const geocoder = new google.maps.Geocoder();
    if (!geocoder) return { error: "Geocoder not defined", status: false };

    const latlng = new google.maps.LatLng(
      location.coords.latitude,
      location.coords.longitude
    );
    const data = await geocoder.geocode({
      location: latlng,
    });

    if (options?.cache) locationCache.set(cacheKey, data);

    return { data, status: true };
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};

export const getCurrentLocationDetails = async (
  options?: CommonLocationOptions
) => {
  try {
    const location = await getLocationAsync();
    const locationInfo = await getLocationInfoAsync(location, options);
    return locationInfo;
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
};
