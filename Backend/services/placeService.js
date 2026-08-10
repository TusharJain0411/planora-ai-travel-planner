import axios from "axios";

export const getPlaceDetails = async (placeName, destination) => {
  try {
    const query = `${placeName}, ${destination}`;

    console.log("SEARCHING PLACE:", query);

    const searchResponse = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: query,
        maxResultCount: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.photos",
        },
      },
    );

    const place = searchResponse.data.places?.[0];

    if (!place) {
      console.log("❌ PLACE NOT FOUND:", query);

      return {
        placeId: "",
        address: "",
        lat: null,
        lng: null,
        rating: null,
        image: "",
      };
    }

    console.log("✅ PLACE FOUND:", place.displayName?.text);

    let image = "";

    if (place.photos?.length > 0) {
      const photoName = place.photos[0].name;

      image =
        `https://places.googleapis.com/v1/${photoName}/media` +
        `?maxWidthPx=800` +
        `&maxHeightPx=600` +
        `&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    }

    return {
      placeId: place.id || "",

      address: place.formattedAddress || "",

      lat: place.location?.latitude ?? null,

      lng: place.location?.longitude ?? null,

      rating: place.rating ?? null,

      image,
    };
  } catch (error) {
    console.error(
      "❌ PLACE DETAILS ERROR:",
      error.response?.data || error.message,
    );

    return {
      placeId: "",
      address: "",
      lat: null,
      lng: null,
      rating: null,
      image: "",
    };
  }
};
