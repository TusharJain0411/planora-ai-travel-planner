import axios from "axios";

export const getNearbyStays = async (
  destination,
  accommodation
) => {
  try {
    const query = `${accommodation} in ${destination}`;

    console.log("🏨 Searching:", query);

    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: query,
        maxResultCount: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key":
            process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.googleMapsUri",
        },
      }
    );

    const places = response.data.places || [];

    return places.map((place) => ({
      placeId: place.id,

      name: place.displayName?.text || "Unnamed Stay",

      location: place.formattedAddress || "",

      lat: place.location?.latitude || null,

      lng: place.location?.longitude || null,

      rating: place.rating || 0,

      reviews: place.userRatingCount || 0,

      image: place.photos?.[0]?.name
        ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=800&key=${process.env.GOOGLE_MAPS_API_KEY}`
        : "",

      mapUrl: place.googleMapsUri || "",

      type: accommodation,
    }));
  } catch (error) {
    console.error(
      "Stay search error:",
      error.response?.data || error.message
    );

    return [];
  }
};