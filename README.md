# Google Current Geocode

A quick utility package to handle location permissions and retrieve complete location information using the Google Places Geocoding API.

<span style="color: #b5213e;">This package is currently in the Beta Testing phase. We are testing it with the most commonly used libraries and frameworks while aiming to create frequently used location features. Feel free to contribute!</span>

## Easy to Set Up

1. **Install this lightweight package:**

 ```bash
   npm install google-current-geocode
```

2. Get your Google API key from [Google Cloud Console](https://console.cloud.google.com)

3. Add the Google API script using the best approach for your project, or simply use the setupGooglePlacesApiScript function provided by the package:

```javascript
import { setupGooglePlacesApiScript } from "google-current-geocode";
```

4. Invoke the setup function in the most appropriate place based on your project.

```javascript
// common usage
const googleApiKey = process.env.GOOGLE_API_KEY;
if(googleApiKey) setupGooglePlacesApiScript(googleApiKey);

// for React
useEffect(() => {
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if(googleApiKey) setupGooglePlacesApiScript(googleApiKey)
}, [])
```

5. Call the location details fetcher function anywhere in your application. This simple function requests the user’s current location permission and calls the Google Geocoding API to fetch the location details.

```jsx
import { getCurrentLocationDetails } from "google-current-geocode";

// common usage
document.querySelector("#location").addEventListener("click", () => getCurrentLocationDetails());

// for React
<button onClick={() => getCurrentLocationDetails()}>Get Location</button>
```

6. Ensure type safety with @types/google.maps:
The package utilizes the @types/google.maps package. If it does not work as expected, you can manually install the type definitions:

```bash
npm install @types/google.maps
```

## Options & Customizations

You can pass options to customize the behavior of the getCurrentLocationDetails function:

```javascript
getCurrentLocationDetails({ cache: true })
```

| Name   |      Type      |         Description      |  
|:----------|:-------------|:-------------------------|
| cache |  boolean | Avoids calling the Google Geocoding API by caching location information based on latitude and longitude. |

## Contributor(s)

- [Varchasvi Pandey](https://github.com/varchasvipandey)
