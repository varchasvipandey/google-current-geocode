"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentLocationDetails = exports.setupGooglePlacesApiScript = void 0;
const lru_cache_1 = require("lru-cache");
const options = {
    max: 10,
    ttl: 1000 * 60 * 5,
};
const locationCache = new lru_cache_1.LRUCache(options);
const setupGooglePlacesApiScript = (googleApiKey) => {
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
exports.setupGooglePlacesApiScript = setupGooglePlacesApiScript;
const getLocationAsync = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => resolve(position), (error) => reject(error));
    });
};
const getLocationInfoAsync = (location, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!location)
            return { error: "Location not found", status: false };
        const cacheKey = `${location.coords.latitude},${location.coords.longitude}`;
        if (options === null || options === void 0 ? void 0 : options.cache) {
            const cachedResult = locationCache.get(cacheKey);
            if (cachedResult) {
                return {
                    status: true,
                    data: cachedResult,
                };
            }
        }
        const geocoder = new google.maps.Geocoder();
        if (!geocoder)
            return { error: "Geocoder not defined", status: false };
        const latlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        const data = yield geocoder.geocode({
            location: latlng,
        });
        if (options === null || options === void 0 ? void 0 : options.cache)
            locationCache.set(cacheKey, data);
        return { data, status: true };
    }
    catch (e) {
        console.error(e);
        throw new Error(e);
    }
});
const getCurrentLocationDetails = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield getLocationAsync();
        const locationInfo = yield getLocationInfoAsync(location, options);
        return locationInfo;
    }
    catch (e) {
        console.error(e);
        throw new Error(e);
    }
});
exports.getCurrentLocationDetails = getCurrentLocationDetails;
